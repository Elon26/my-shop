import React, { useEffect, useState } from "react";
import betweenNumberSpacer from "../../../utils/betweenNumberSpacer";
import { generateEndingForSingular } from "../../../utils/generateEnding";
import InStock from "../../common/inStock";
import "../../../styles/productPage.scss";
import createTodayTomorrowMessage from "../../../utils/createTodayTomorrowMessage";
import { useHistory } from "react-router-dom";
import Popup from "../../common/popup";
import {
    getDataFromLocalStorage,
    updateCartInLocalStorage
} from "../../../services/localStorageService";
import { getProduct, getProductsLoadingStatus } from "../../../store/products";
import { useAppSelector } from "../../../hooks/reduxHook";

interface ProductPageProps {
    productName: string;
}

const ProductPage = ({ productName }: ProductPageProps) => {
    const [isImgPopupOpen, setIsImgPopupOpen] = useState(false);
    const [isTextPopupOpen, setIsTextPopupOpen] = useState(false);

    const product = useAppSelector(getProduct(productName));
    const isLoading = useAppSelector(getProductsLoadingStatus());

    const history = useHistory();
    useEffect(() => {
        if (!isLoading && !product) {
            history.push("/my-shop/404/");
        }
    }, [product]);

    const userCart = getDataFromLocalStorage("diplomUserCart") || "";
    const isInCart = product && userCart.includes(product._id);

    const goToCart = () => {
        history.push("/my-shop/cart/");
    };

    const addToCart = (e: React.MouseEvent<HTMLElement>) => {
        if (product && e.target instanceof HTMLElement) {
            const data = {
                [product._id]: {
                    id: product._id,
                    quantityToBuy: 1
                }
            };
            updateCartInLocalStorage("diplomUserCart", data);
            setIsTextPopupOpen(true);
        }
    };

    return (
        <>
            {product && (
                <>
                    <h1 className="mainHeader">{product.label}</h1>
                    <div className="productPage">
                        <div className="productPage__img">
                            <img
                                src={product.img}
                                alt={product.label}
                                onClick={() => setIsImgPopupOpen(true)}
                            />
                        </div>
                        <div className="productPage__infoColumn">
                            <div className="productPage__ratingBlock">
                                <span className="productPage__rating">
                                    Рейтинг: {product.rate}{" "}
                                </span>
                                <span className="productPage__votes">
                                    {betweenNumberSpacer(product.votes)} голос
                                    {generateEndingForSingular(product.votes)}
                                </span>
                            </div>
                            <div className="productPage__card">
                                <div className="productPage__priceBlock">
                                    <span className="productPage__price">
                                        {betweenNumberSpacer(product.price)}{" "}
                                        &#8381;
                                    </span>
                                    {product.oldPrice !== 0 && (
                                        <span className="productPage__oldPrice">
                                            {betweenNumberSpacer(
                                                product.oldPrice
                                            )}
                                        </span>
                                    )}
                                </div>
                                <InStock quantity={product.quantity} />
                                {product.quantity > 0 && !isInCart && (
                                    <button
                                        onClick={addToCart}
                                        className="productCard__button button"
                                    >
                                        Купить
                                    </button>
                                )}
                                {product.quantity === 0 && !isInCart && (
                                    <button className="productCard__button button button_disabled">
                                        Купить
                                    </button>
                                )}
                                {isInCart && (
                                    <button
                                        onClick={goToCart}
                                        className="productCard__button button button_green"
                                    >
                                        В корзине
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="productPage__logistics">
                            <div className="productPage__sendBlock">
                                <p>Доставка по городу</p>
                                <p>599 руб.</p>
                                <p>{createTodayTomorrowMessage(14)}</p>
                            </div>
                            <div className="productPage__sendBlock">
                                <p>Самовывоз</p>
                                <p>бесплатно</p>
                                <p>{createTodayTomorrowMessage(20)}</p>
                            </div>
                        </div>
                    </div>
                    <Popup
                        type="img"
                        isPopupOpen={isImgPopupOpen}
                        imgForFullScreen={product.img}
                        label={product.label}
                        handleClose={() => setIsImgPopupOpen(false)}
                    />
                    <Popup
                        type="text"
                        isPopupOpen={isTextPopupOpen}
                        handleClose={() => setIsTextPopupOpen(false)}
                        productId={product._id}
                    />
                </>
            )}
        </>
    );
};

export default ProductPage;
