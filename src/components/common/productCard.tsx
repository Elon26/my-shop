import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { getDataFromLocalStorage } from "../../services/localStorageService";
import betweenNumberSpacer from "../../utils/betweenNumberSpacer";
import limitedText from "../../utils/limitedText";
import InStock from "./inStock";
import StarRating from "../ui/starRating/starRating";
import { IProduct } from "../../models";

interface ProductCardProps {
    categoryName: string;
    subCategoryName: string;
    productName: string;
    id: string;
    img: string;
    label: string;
    price: number;
    oldPrice: number;
    rate: number;
    votes: number;
    quantity: number;
    handleClick(e: React.MouseEvent<HTMLElement>): void;
    product: IProduct
}

const ProductCard = ({
    categoryName,
    subCategoryName,
    productName,
    id,
    img,
    label,
    price,
    oldPrice,
    rate,
    votes,
    quantity,
    handleClick,
    product
}: ProductCardProps) => {
    const productUrl =
        "/my-shop/categories/" +
        categoryName +
        "/" +
        subCategoryName +
        "/" +
        productName +
        "/";

    const userCart = getDataFromLocalStorage("diplomUserCart") || "";
    const isInCart = userCart.includes(id);

    const history = useHistory();
    const goToCart = () => {
        history.push("/my-shop/cart/");
    };

    const { windowWidth } = useWindowDimensions();

    return (
        <div className="productCard" id={id}>
            {windowWidth && windowWidth >= 768 && (
                <>
                    <Link className="productCard__img" to={productUrl}>
                        <img src={img} alt={label} />
                    </Link>
                    <div className="productCard__contentColumn">
                        <StarRating
                            product={product}
                        />
                        <div className="productCard__label">
                            <Link to={productUrl}>
                                {limitedText(label, 65)}
                            </Link>
                        </div>
                        <div>
                            {quantity > 0 && !isInCart && (
                                <button
                                    onClick={handleClick}
                                    className="productCard__button button"
                                >
                                    Купить
                                </button>
                            )}
                            {quantity === 0 && !isInCart && (
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
                    <div className="productCard__priceColumn">
                        {oldPrice !== 0 && (
                            <div className="productCard__oldPrice">
                                {betweenNumberSpacer(oldPrice)} руб.
                            </div>
                        )}
                        <div className="productCard__price">
                            {betweenNumberSpacer(price)} руб.
                        </div>
                        <InStock quantity={quantity} />
                    </div>
                </>
            )}
            {windowWidth && windowWidth < 768 && (
                <>
                    <Link className="productCard__img" to={productUrl}>
                        <img src={img} alt={label} />
                    </Link>
                    <div className="productCard__contentColumn">
                        <StarRating
                            product={product}
                        />
                        <div className="productCard__label">
                            <Link to={productUrl}>
                                {limitedText(label, 45)}
                            </Link>
                        </div>
                        <div>
                            {oldPrice !== 0 && (
                                <div className="productCard__oldPrice">
                                    {betweenNumberSpacer(oldPrice)} руб.
                                </div>
                            )}
                            <div className="productCard__price">
                                {betweenNumberSpacer(price)} руб.
                            </div>
                            <InStock quantity={quantity} />
                            {quantity > 0 && !isInCart && (
                                <button
                                    onClick={handleClick}
                                    className="productCard__button button"
                                >
                                    Купить
                                </button>
                            )}
                            {quantity === 0 && !isInCart && (
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
                </>
            )}
        </div>
    );
};

export default ProductCard;
