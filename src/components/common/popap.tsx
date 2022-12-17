import React from "react";
import { BiX } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHook";
import { getProductById } from "../../store/products";
import betweenNumberSpacer from "../../utils/betweenNumberSpacer";
import limitedText from "../../utils/limitedText";

interface PaginationProps {
    type: string;
    isPopapOpen: boolean;
    imgForFullScreen?: string;
    label?: string;
    handleClose(): void;
    productId?: string;
    textForMessage?: string;
    textForButton?: string;
    handleFinishTheDeal?(): void;
}

const Popap = ({
    type,
    isPopapOpen,
    imgForFullScreen,
    label,
    handleClose,
    productId,
    textForMessage,
    textForButton,
    handleFinishTheDeal
}: PaginationProps) => {
    const popapClassToggle = (type: string) => {
        if (type === "img") {
            return (
                "popap__body" +
                " popap__body_img" +
                (isPopapOpen ? " active" : "")
            );
        } else {
            return "popap__body" + (isPopapOpen ? " active" : "");
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
            !e.target.closest(".popap__content")
        ) {
            handleClose();
        }
    };

    return (
        <div className="popap">
            <div
                className={popapClassToggle(type)}
                onClick={handleClickToEmptySpace}
            >
                <div className="popap__content">
                    {type === "img" && (
                        <img
                            className="popap__img"
                            src={imgForFullScreen}
                            alt={label}
                        />
                    )}
                    {product && type === "text" && (
                        <div className="popap__contentBody">
                            <div className="popap__header">
                                Вы добавили в корзину
                            </div>
                            <div className="popap__itemRow">
                                <div className="popap__imgRow">
                                    <img
                                        src={product.img}
                                        alt={product.label}
                                    />
                                </div>
                                <div className="popap__label">
                                    {limitedText(product.label, 40)}
                                </div>
                                <div className="popap__quantity">1 шт.</div>
                                <div className="popap__price">
                                    <b>{betweenNumberSpacer(product.price)}</b>{" "}
                                    руб.
                                </div>
                            </div>
                            <div className="popap__btnsRow">
                                <button
                                    className="popap__toCartButton button"
                                    onClick={handleRedirect}
                                >
                                    Оформить заказ
                                </button>
                                <div
                                    className="popap__contButton"
                                    onClick={handleClose}
                                >
                                    Продолжить выбирать товары
                                </div>
                            </div>
                        </div>
                    )}
                    {type === "simpleText" && (
                        <div className="popap__contentBody">
                            <br />
                            <br />
                            <div className="popap__header">
                                {textForMessage}
                            </div>
                            <div className="popap__btnsRow">
                                <button
                                    className="popap__toCartButton popap__toCartButton_big button button_green"
                                    onClick={handleFinishTheDeal}
                                >
                                    {textForButton}
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="popap__closeIcon" onClick={handleClose}>
                        <BiX />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popap;
