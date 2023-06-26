import React from "react";
import "../../../styles/footer.scss";
import { telToHrefChange, telToStringChange } from "../../../utils/telHandlerForHTML";
import { BASIC_PHONE } from "../../../constants";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__body">
                <div className="footer__col">
                    <div className="footer__title">
                        Наша компания
                    </div>
                    <div className="footer__item">
                        <Link to="/my-shop/about/">
                            О компании
                        </Link>
                    </div>
                    <div className="footer__item">
                        <Link to="/my-shop/policy/">
                            Политика
                        </Link>
                    </div>
                    <div className="footer__item">
                        <Link to="/my-shop/stores/">
                            Магазины
                        </Link>
                    </div>
                </div>
                <div className="footer__col">
                    <div className="footer__title">
                        Покупателю
                    </div>
                    <div className="footer__item">
                        <Link to="/my-shop/delivery/">
                            Доставка
                        </Link>
                    </div>
                    <div className="footer__item">
                        <Link to="/my-shop/payment/">
                            Способы оплаты
                        </Link>
                    </div>
                    <div className="footer__item">
                        <Link to="/my-shop/refund/">
                            Возврат
                        </Link>
                    </div>
                </div>
                <div className="footer__col">
                    <div className="footer__title">
                        <a
                            href={telToHrefChange(BASIC_PHONE.phone)}
                        >
                            {telToStringChange(BASIC_PHONE.phone)}
                        </a>
                    </div>
                    <div className="footer__item">
                        Звоните круглосуточно
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
