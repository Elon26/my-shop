import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHook";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { getCategory } from "../../../store/categories";
import { getProduct } from "../../../store/products";
import { getSubCategory } from "../../../store/subCategories";
import "../../../styles/breadcrumbs.scss";
import limitedText from "../../../utils/limitedText";

const Breadcrumbs = () => {
    const location = useLocation();
    const rotesWithTrash = location.pathname.split("/");
    const rotes = rotesWithTrash.filter((route) => route !== "");

    const category = useAppSelector(getCategory(rotes[2]));
    const subCategory = useAppSelector(getSubCategory(rotes[3]));
    const product = useAppSelector(getProduct(rotes[4]));

    const { windowWidth } = useWindowDimensions();

    if (location.pathname.includes("/my-shop/admin/")) return null;

    return (
        <div className="breadcrumbs">
            <div className="breadcrumbs__body">
                {rotes.length > 1 && (
                    <Link to="/my-shop/" className="breadcrumbs__item">
                        Главная
                    </Link>
                )}
                {category && !subCategory && (
                    <>
                        <span>{`>`}</span>
                        <span className="breadcrumbs__item">
                            {category.label}
                        </span>
                    </>
                )}
                {category && subCategory && !product && (
                    <>
                        <span>{`>`}</span>
                        <Link
                            to={"/my-shop/categories/" + category.name}
                            className="breadcrumbs__item"
                        >
                            {category.label}
                        </Link>
                        <span>{`>`}</span>
                        <span className="breadcrumbs__item">
                            {subCategory.label}
                        </span>
                    </>
                )}
                {category && subCategory && product && (
                    <>
                        <span>{`>`}</span>
                        <Link
                            to={"/my-shop/categories/" + category.name}
                            className="breadcrumbs__item"
                        >
                            {category.label}
                        </Link>
                        <span>{`>`}</span>
                        <Link
                            to={
                                "/my-shop/categories/" +
                                category.name +
                                "/" +
                                subCategory.name
                            }
                            className="breadcrumbs__item"
                        >
                            {subCategory.label}
                        </Link>
                        <span>{`>`}</span>
                        {
                            <span className="breadcrumbs__item">
                                {limitedText(
                                    product.label,
                                    windowWidth && windowWidth >= 480
                                        ? windowWidth >= 768
                                            ? 75
                                            : 50
                                        : 35
                                )}
                            </span>
                        }
                    </>
                )}
                {rotes[1] === "cart" && (
                    <>
                        <span>{`>`}</span>
                        <span className="breadcrumbs__item">Корзина</span>
                    </>
                )}
                {rotes[1] === "login" && (
                    <>
                        <span>{`>`}</span>
                        <span className="breadcrumbs__item">Авторизация</span>
                    </>
                )}
                {rotes[1] === "register" && (
                    <>
                        <span>{`>`}</span>
                        <span className="breadcrumbs__item">Регистрация</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default Breadcrumbs;
