import React, { useEffect, useState } from "react";
import betweenNumberSpacer from "../../../utils/betweenNumberSpacer";
import { generateEndingForSingular } from "../../../utils/generateEnding";
import InStock from "../../common/inStock";
import "../../../styles/productPage.scss";
import createTodayTomorrowMessage from "../../../utils/createTodayTomorrowMessage";
import { useHistory } from "react-router-dom";
import Popap from "../../common/popap";
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
    const [isImgPopapOpen, setIsImgPopapOpen] = useState(false);
    const [isTextPopapOpen, setIsTextPopapOpen] = useState(false);

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
            setIsTextPopapOpen(true);
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
                                onClick={() => setIsImgPopapOpen(true)}
                            />
                        </div>
                        <div className="productPage__infoColumn">
                            <div className="productPage__ratingBlock">
                                <span className="productPage__rating">
                                    ??????????????: {product.rate}{" "}
                                </span>
                                <span className="productPage__votes">
                                    {betweenNumberSpacer(product.votes)} ??????????
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
                                        ????????????
                                    </button>
                                )}
                                {product.quantity === 0 && !isInCart && (
                                    <button className="productCard__button button button_disabled">
                                        ????????????
                                    </button>
                                )}
                                {isInCart && (
                                    <button
                                        onClick={goToCart}
                                        className="productCard__button button button_green"
                                    >
                                        ?? ??????????????
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="productPage__logistics">
                            <div className="productPage__sendBlock">
                                <p>???????????????? ???? ????????????</p>
                                <p>599 ??????.</p>
                                <p>{createTodayTomorrowMessage(14)}</p>
                            </div>
                            <div className="productPage__sendBlock">
                                <p>??????????????????</p>
                                <p>??????????????????</p>
                                <p>{createTodayTomorrowMessage(20)}</p>
                            </div>
                        </div>
                    </div>
                    <Popap
                        type="img"
                        isPopapOpen={isImgPopapOpen}
                        imgForFullScreen={product.img}
                        label={product.label}
                        handleClose={() => setIsImgPopapOpen(false)}
                    />
                    <Popap
                        type="text"
                        isPopapOpen={isTextPopapOpen}
                        handleClose={() => setIsTextPopapOpen(false)}
                        productId={product._id}
                    />
                </>
            )}
        </>
    );
};

export default ProductPage;
