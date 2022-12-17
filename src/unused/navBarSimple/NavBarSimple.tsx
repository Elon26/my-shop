import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { useClickCatcher } from "../../hooks/useClickCatcher";
import { getCurrentUser, getIsLoggedIn, logout } from "../../store/users";
import "../../../styles/navBarSimple.scss";
import Search from "../../components/ui/search";

const NavBarSimple = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(getCurrentUser());
    const isLoggedIn = useAppSelector(getIsLoggedIn());

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

    return (
        <>
            <div className="container">
                {currentUser &&
                    currentUser.id === "vmxyQSIfXBgDWOy6P8sx0ZmCsZI2" &&
                    !location.pathname.includes("/my-shop/admin/") && (
                        <div className="adminPanel">
                            <Link to="/my-shop/admin/">
                                Войти в панель администратора
                            </Link>
                        </div>
                    )}
                <div className="flex-between">
                    <Link className="" to="/my-shop/">
                        Главная
                    </Link>
                    {!isLoggedIn && (
                        <Link className="" to="/my-shop/login/">
                            Вход и регистрация
                        </Link>
                    )}
                    <Link className="" to="/my-shop/cart/">
                        Корзина
                    </Link>
                    <div className="currentUserArea">
                        {isLoggedIn && currentUser && (
                            <>
                                <div
                                    className="currentUserArea__main"
                                    onClick={() =>
                                        setIsDropdownOpen(
                                            (prevState) => !prevState
                                        )
                                    }
                                >
                                    Здравствуйте, {currentUser.name}
                                </div>
                                {isDropdownOpen && currentUserAreaIsInFocus && (
                                    <div className="currentUserArea__dropdownArea">
                                        <div
                                            className="currentUserArea__dropdownItem"
                                            onClick={handleLogout}
                                        >
                                            Выйти
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        {!isLoggedIn && "Здравствуйте, Гость"}
                    </div>
                </div>
            </div>
            {!location.pathname.includes("/my-shop/admin/") && (
                <Search />
            )}
        </>
    );
};

export default NavBarSimple;
