import React, { useState } from "react";
import {
    clearCartFromLocalStorage,
    deleteCartItemFromLocalStorage,
    getCartFromLocalStorage,
    updateCartInLocalStorage
} from "../../services/localStorageService";
import "../../styles/cartPage.scss";
import CartProduct from "../../components/common/cartProduct";
import { toast } from "react-toastify";
import betweenNumberSpacer from "../../utils/betweenNumberSpacer";
import Popap from "../../components/common/popap";
import { useHistory } from "react-router-dom";
import createTodayTomorrowMessage from "../../utils/createTodayTomorrowMessage";
import { ICartInLocalStorageItem } from "../../models";
import { wrapAsyncFunction } from "../../utils/wrapAsyncFunction";
import { getProductsById, loadProductsList } from "../../store/products";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import axios from "axios";
import Loader from "../../components/ui/loader";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

const CartPage = () => {
    const dispatch = useAppDispatch();
    const userCart = getCartFromLocalStorage("diplomUserCart");
    const userCartArray = Object.keys(userCart);
    const products =
        getProductsById && useAppSelector(getProductsById(userCartArray));
    const [isLoading, setIsLoading] = useState(false);

    const [productsInCart, setProductsInCart] = useState(
        products?.map((product) => {
            return {
                ...product,
                quantityToBuy: userCart[product._id].quantityToBuy
            };
        })
    );

    const changeQuantityToBuy = (
        event: React.ChangeEvent<HTMLInputElement>,
        id: string,
        quantity: number
    ) => {
        let productId = "";
        const targetValue = Number(event.target.value);
        if (targetValue > quantity) toast.error("Выбрано максимальное количество товара");
        const newValue = targetValue <= quantity ? targetValue : quantity;
        if (newValue > 0 && newValue < 100) {
            const newState = productsInCart?.map((product) => {
                if (product._id === id) {
                    productId = product._id;
                    product.quantityToBuy = newValue;
                    return product;
                } else {
                    return product;
                }
            });
            setProductsInCart(newState);
            if (productId) {
                const data = {
                    [productId]: {
                        id: productId,
                        quantityToBuy: newValue
                    }
                };
                updateCartInLocalStorage("diplomUserCart", data);
            }
        }
    };

    const handleDecrement = (id: string) => {
        let productId = "";
        const oldValue = productsInCart?.find(
            (product) => product._id === id
        )?.quantityToBuy;
        const newValue = oldValue && oldValue - 1;
        if (newValue && newValue > 0) {
            const newState = productsInCart?.map((product) => {
                if (product._id === id) {
                    productId = product._id;
                    product.quantityToBuy = newValue;
                    return product;
                } else {
                    return product;
                }
            });
            setProductsInCart(newState);
            if (productId) {
                const data = {
                    [productId]: {
                        id: productId,
                        quantityToBuy: newValue
                    }
                };
                updateCartInLocalStorage("diplomUserCart", data);
            }
        } else {
            toast.error("Выбрано минимальное количество товара");
        }
    };

    const handleIncrement = (id: string, quantity: number) => {
        let productId = "";
        const oldValue = productsInCart?.find(
            (product) => product._id === id
        )?.quantityToBuy;
        if (oldValue === quantity) toast.error("Выбрано максимальное количество товара");
        const newValue =
            oldValue && oldValue < quantity
                ? oldValue && oldValue + 1
                : quantity;
        const newState = productsInCart?.map((product) => {
            if (product._id === id) {
                productId = product._id;
                product.quantityToBuy = newValue;
                return product;
            } else {
                return product;
            }
        });
        setProductsInCart(newState);
        if (productId) {
            const data = {
                [productId]: {
                    id: productId,
                    quantityToBuy: newValue
                }
            };
            updateCartInLocalStorage("diplomUserCart", data);
        }
    };

    const handleDelete = (id: string) => {
        deleteCartItemFromLocalStorage("diplomUserCart", id);

        const newState = productsInCart?.filter(
            (product) => product._id !== id
        );
        setProductsInCart(newState);
    };

    const sumPrice = productsInCart?.reduce((acc, product) => {
        return acc + product.price * product.quantityToBuy;
    }, 0);

    const [isPopapOpen, setIsPopapOpen] = useState(false);
    const history = useHistory();

    const handleFinishTheDeal = async () => {
        toast.info(
            `Оплата подтвердена, ожидайте звонка от курьерской службы ${createTodayTomorrowMessage(
                14
            )}`
        );
        setIsPopapOpen(false);
        setIsLoading(true);
        await updateDatabase(userCart);
        clearCartFromLocalStorage("diplomUserCart");
        setIsLoading(false);
        history.push("/my-shop/");
    };

    const updateDatabase = async (userCart: ICartInLocalStorageItem) => {
        for (const cartItem in userCart) {
            const productId = userCart[cartItem].id;
            const product = products.find(
                (product) => product._id === productId
            );
            const data = product && {
                ...product,
                quantity: product.quantity - userCart[cartItem].quantityToBuy
            };

            await axios.put(
                "products/" + userCart[cartItem].id + ".json",
                data
            );

            await dispatch(loadProductsList());
        }
    };

    const { windowWidth } = useWindowDimensions();

    if (isLoading) return <Loader />;

    return (
        <div className="cart">
            {userCartArray.length === 0 && (
                <h1 className="cart__header">Ваша корзина пуста</h1>
            )}
            {userCartArray.length > 0 && (
                <>
                    <h1 className="cart__header">Ваша корзина</h1>
                    <div className="cart__body">
                        {productsInCart?.map((product) => (
                            <CartProduct
                                key={product._id}
                                id={product._id}
                                img={product.img}
                                label={product.label}
                                price={product.price}
                                oldPrice={product.oldPrice}
                                quantity={product.quantity}
                                quantityToBuy={product.quantityToBuy}
                                handleChange={changeQuantityToBuy}
                                handleDecrement={handleDecrement}
                                handleIncrement={handleIncrement}
                                handleDelete={handleDelete}
                                categoryName={product.categoryName}
                                subCategoryName={product.subCategoryName}
                                productName={product.name}
                            />
                        ))}
                    </div>
                    <div className="cart__sumPrice">
                        Общая стоимость товаров:{" "}
                        {windowWidth && windowWidth < 480 && <br />}
                        <b>{sumPrice && betweenNumberSpacer(sumPrice)}</b> руб.
                    </div>
                    <div
                        className="cart__button button button_green"
                        onClick={() => setIsPopapOpen(true)}
                    >
                        Оформить заказ
                    </div>
                </>
            )}
            <Popap
                type="simpleText"
                textForMessage="Заказ оформлен, пожалуйста, подтвердите оплату."
                textForButton="Подтверждаю"
                isPopapOpen={isPopapOpen}
                handleClose={() => setIsPopapOpen(false)}
                handleFinishTheDeal={wrapAsyncFunction(handleFinishTheDeal)}
            />
        </div>
    );
};

export default CartPage;
