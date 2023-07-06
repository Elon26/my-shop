import React, { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { IProduct } from "../../../models";
import { Link, useHistory } from "react-router-dom";
import betweenNumberSpacer from "../../../utils/betweenNumberSpacer";
import { getDataFromLocalStorage, updateCartInLocalStorage } from "../../../services/localStorageService";

interface SlideProps {
    product: IProduct;
}

const Slide = ({ product }: SlideProps) => {
    const productUrl =
        "/my-shop/categories/" +
        product.categoryName +
        "/" +
        product.subCategoryName +
        "/" +
        product.name +
        "/";
    const userCart = getDataFromLocalStorage("diplomUserCart") || "";
    const [isInCart, setIsInCart] = useState(userCart.includes(product._id));

    function handleClick() {
        const data = {
            [product._id]: {
                id: product._id,
                quantityToBuy: 1
            }
        };
        updateCartInLocalStorage("diplomUserCart", data);
        setIsInCart(true);
    }

    const history = useHistory();
    const goToCart = () => {
        history.push("/my-shop/cart/");
    };

    return (
        <div className="popularSlider__slide">
            <Link to={productUrl} className="popularSlider__img">
                <img src={product.img} alt={product.label} />
            </Link>
            <Link to={productUrl} className="popularSlider__label">
                {product.label}
            </Link>
            <div className="popularSlider__slideFooter">
                <div className="popularSlider__priceField">
                    {product.oldPrice !== 0 && (
                        <div className="popularSlider__oldPrice">
                            {betweenNumberSpacer(product.oldPrice)} руб.
                        </div>
                    )}
                    <div className="popularSlider__price">
                        {betweenNumberSpacer(product.price)} руб.
                    </div>
                </div>
                <div className="popularSlider__buttonField">
                    {product.quantity > 0 && !isInCart && (
                        <button
                            onClick={handleClick}
                            className="popularSlider__button button"
                        >
                            Купить
                        </button>
                    )}
                    {product.quantity === 0 && !isInCart && (
                        <button className="popularSlider__button button button_disabled">
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
        </div>
    );
};

export default Slide;
