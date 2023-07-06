import React, { useEffect, useState } from "react";
import "../../../styles/navBar.scss";
import { Link, useHistory, useLocation } from "react-router-dom";
import NavBarStores from "./NavBarStores";
import {
    telToHrefChange,
    telToStringChange
} from "../../../utils/telHandlerForHTML";
import { BASIC_PHONE, LOGO_URL } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { useClickCatcher } from "../../../hooks/useClickCatcher";
import { getCurrentUser, getIsLoggedIn, logout } from "../../../store/users";
import "../../../styles/navBarSimple.scss";
import Search from "../search";
import {
    BsFillCartFill,
    BsFillPersonFill,
    BsFillPersonCheckFill
} from "react-icons/bs";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { getCart } from "../../../store/cart";

const NavBar = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(getCurrentUser());
    const isLoggedIn = useAppSelector(getIsLoggedIn());
    const { windowWidth } = useWindowDimensions();
    const cart = useAppSelector(getCart());
    const [currentQuantity, setCurrentQuantity] = useState(0);

    const handleLogout = () => {
        dispatch(logout());
        history.push("/my-shop/");
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { currentUserAreaIsInFocus } = useClickCatcher();

    useEffect(() => {
        if (!currentUserAreaIsInFocus) {
            setIsDropdownOpen(false);
        }
    }, [currentUserAreaIsInFocus]);

    useEffect(() => {
        const newQuantity = cart ? Object.values(cart).reduce((acc, item) => {
            return acc + item.quantityToBuy;
        }, 0) : 0;

        setCurrentQuantity(newQuantity);
    }, [cart]);

    return (
        <header>
            {currentUser && currentUser.id === "vmxyQSIfXBgDWOy6P8sx0ZmCsZI2" && !location.pathname.includes("/my-shop/admin/") && (
                <div className="adminPanel">
                    <Link to="/my-shop/admin/">
                        Войти в панель администратора
                    </Link>
                </div>
            )}
            <div className="topNavBar">
                <div className="topNavBar__body">
                    <div className="topNavBar__left">
                        <Link className="topNavBar__logo" to="/my-shop/">
                            <img src={LOGO_URL} alt="Логотип" />
                        </Link>
                        <NavBarStores />
                    </div>
                    {windowWidth && windowWidth >= 1240 && (
                        <div className="topNavBar__center">
                            <Search />
                        </div>
                    )}
                    <div className="topNavBar__right">
                        <Link
                            to="/my-shop/cart/"
                            className="topNavBar__menuObject"
                        >
                            <div className="topNavBar__menuObjectIcon">
                                <BsFillCartFill />
                            </div>
                            <div className="topNavBar__menuObjectText">
                                Корзина
                            </div>
                            {currentQuantity > 0 && <div className="topNavBar__cartQuantity">
                                {currentQuantity}
                            </div>}
                        </Link>
                        {(!isLoggedIn || (isLoggedIn && !currentUser)) && (
                            <Link
                                to="/my-shop/login/"
                                className="topNavBar__menuObject"
                            >
                                <div className="topNavBar__menuObjectIcon">
                                    <BsFillPersonFill />
                                </div>
                                <div className="topNavBar__menuObjectText">
                                    Вход
                                </div>
                            </Link>
                        )}
                        {isLoggedIn && currentUser && (
                            <div className="topNavBar__loginItem">
                                <div
                                    className="topNavBar__menuObject"
                                    onClick={() =>
                                        setIsDropdownOpen(
                                            (prevState) => !prevState
                                        )
                                    }
                                >
                                    <div className="topNavBar__menuObjectIcon">
                                        <BsFillPersonCheckFill />
                                    </div>
                                    <div className="topNavBar__menuObjectText">
                                        {currentUser.name}
                                    </div>
                                </div>
                                {isDropdownOpen && currentUserAreaIsInFocus && (
                                    <div className="topNavBar__dropdownArea">
                                        <div
                                            className="topNavBar__dropdownItem"
                                            onClick={handleLogout}
                                        >
                                            Выйти
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="topNavBar__menuItem">
                            <a
                                className="topNavBar__basicPhone"
                                href={telToHrefChange(BASIC_PHONE.phone)}
                            >
                                {telToStringChange(BASIC_PHONE.phone)}
                            </a>
                            <span className="topNavBar__phoneShedule">
                                ({BASIC_PHONE.shedule})
                            </span>
                        </div>
                    </div>
                    {windowWidth && windowWidth < 1240 && (
                        <div className="topNavBar__center">
                            <Search />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default NavBar;
