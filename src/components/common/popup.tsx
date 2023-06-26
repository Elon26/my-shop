import React from "react";
import { BiX } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHook";
import { getProductById } from "../../store/products";
import betweenNumberSpacer from "../../utils/betweenNumberSpacer";
import limitedText from "../../utils/limitedText";

interface PaginationProps {
    type: string;
    isPopupOpen: boolean;
    imgForFullScreen?: string;
    label?: string;
    handleClose(): void;
    productId?: string;
    textForMessage?: string;
    textForButton?: string;
    handleFinishTheDeal?(): void;
}

const Popup = ({
    type,
    isPopupOpen,
    imgForFullScreen,
    label,
    handleClose,
    productId,
    textForMessage,
    textForButton,
    handleFinishTheDeal
}: PaginationProps) => {
    const popupClassToggle = (type: string) => {
        if (type === "img") {
            return (
                "popup__body" +
                " popup__body_img" +
                (isPopupOpen ? " active" : "")
            );
        } else {
            return "popup__body" + (isPopupOpen ? " active" : "");
        }
    };

    const product = useAppSelector(getProductById(productId as string));

    const history = useHistory();
    const handleRedirect = () => {
        history.push("/my-shop/cart/");
    };

    const handleClickToEmptySpace = (e: React.MouseEvent<HTMLElement>) => {
        if (
            e.target instanceof HTMLElement &&
            !e.target.closest(".popup__content")
        ) {
            handleClose();
        }
    };

    return (
        <div className="popup">
            <div
                className={popupClassToggle(type)}
                onClick={handleClickToEmptySpace}
            >
                <div className="popup__content">
                    {type === "img" && (
                        <img
                            className="popup__img"
                            src={imgForFullScreen}
                            alt={label}
                        />
                    )}
                    {product && type === "text" && (
                        <div className="popup__contentBody">
                            <div className="popup__header">
                                Вы добавили в корзину
                            </div>
                            <div className="popup__itemRow">
                                <div className="popup__imgRow">
                                    <img
                                        src={product.img}
                                        alt={product.label}
                                    />
                                </div>
                                <div className="popup__label">
                                    {limitedText(product.label, 40)}
                                </div>
                                <div className="popup__quantity">1 шт.</div>
                                <div className="popup__price">
                                    <b>{betweenNumberSpacer(product.price)}</b>{" "}
                                    руб.
                                </div>
                            </div>
                            <div className="popup__btnsRow">
                                <button
                                    className="popup__toCartButton button"
                                    onClick={handleRedirect}
                                >
                                    Оформить заказ
                                </button>
                                <div
                                    className="popup__contButton"
                                    onClick={handleClose}
                                >
                                    Продолжить выбирать товары
                                </div>
                            </div>
                        </div>
                    )}
                    {type === "simpleText" && (
                        <div className="popup__contentBody">
                            <br />
                            <br />
                            <div className="popup__header">
                                {textForMessage}
                            </div>
                            <div className="popup__btnsRow">
                                <button
                                    className="popup__toCartButton popup__toCartButton_big button button_green"
                                    onClick={handleFinishTheDeal}
                                >
                                    {textForButton}
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="popup__closeIcon" onClick={handleClose}>
                        <BiX />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
