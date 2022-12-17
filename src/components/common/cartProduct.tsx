import React from "react";
import { BiX } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import "../../styles/cartPage.scss";
import betweenNumberSpacer from "../../utils/betweenNumberSpacer";
import limitedText from "../../utils/limitedText";

interface CartProductProps {
    id: string;
    img: string;
    label: string;
    price: number;
    oldPrice: number;
    quantity: number;
    quantityToBuy: number;
    handleChange(
        event: React.ChangeEvent<HTMLInputElement>,
        id: string,
        quantity: number
    ): void;
    handleDecrement(id: string): void;
    handleIncrement(id: string, quantity: number): void;
    handleDelete(id: string): void;
    categoryName: string;
    subCategoryName: string;
    productName: string;
}

const CartProduct = ({
    id,
    img,
    label,
    price,
    oldPrice,
    quantity,
    quantityToBuy,
    handleChange,
    handleDecrement,
    handleIncrement,
    handleDelete,
    categoryName,
    subCategoryName,
    productName
}: CartProductProps) => {
    const productUrl =
        "/my-shop/categories/" +
        categoryName +
        "/" +
        subCategoryName +
        "/" +
        productName +
        "/";

    const { windowWidth } = useWindowDimensions();

    return (
        <div className="cartItem">
            <div className="cartItem__img">
                <img src={img} alt={label} />
            </div>
            <Link to={productUrl} className="cartItem__label">
                {limitedText(
                    label,
                    windowWidth && windowWidth > 1240 ? 60 : 50
                )}
            </Link>
            <div className="cartItem__counterBlock">
                <div
                    className="cartItem__counterBtn"
                    onClick={() => handleDecrement(id)}
                >
                    -
                </div>
                <div className="cartItem__counterInner">
                    <input
                        type="number"
                        value={quantityToBuy}
                        onChange={(e) => handleChange(e, id, quantity)}
                    />
                    <span>шт.</span>
                </div>
                <div
                    className="cartItem__counterBtn"
                    onClick={() => handleIncrement(id, quantity)}
                >
                    +
                </div>
            </div>
            <div className="cartItem__priceBlock">
                <div className="cartItem__price">
                    <b>{betweenNumberSpacer(price)}</b> руб.
                </div>
                {windowWidth && windowWidth >= 768 && oldPrice !== 0 && (
                    <div className="cartItem__oldPrice">
                        {betweenNumberSpacer(oldPrice)}
                    </div>
                )}
            </div>
            <div className="cartItem__totalPrice">
                {quantityToBuy > 1 && (
                    <>
                        <b>{betweenNumberSpacer(price * quantityToBuy)}</b> руб.
                    </>
                )}
            </div>
            <div className="cartItem__delete" onClick={() => handleDelete(id)}>
                {windowWidth && windowWidth >= 768 ? (
                    <BiX />
                ) : (
                    <button className="button">Удалить</button>
                )}
            </div>
        </div>
    );
};

export default CartProduct;
