import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { IProduct } from "../../../models";
import { loadProductsList } from "../../../store/products";
import betweenNumberSpacer from "../../../utils/betweenNumberSpacer";
import limitedText from "../../../utils/limitedText";
import { wrapAsyncFunction } from "../../../utils/wrapAsyncFunction";
import Loader from "../../ui/loader";

interface AdminPanelProductsProps {
    product: IProduct;
    isShow: boolean;
}

const AdminPanelProduct = ({ product, isShow }: AdminPanelProductsProps) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleRemoveProduct = async () => {
        toast.info("Продукт удалён из базы данных");
        setIsLoading(true);
        await axios.delete("products/" + product._id + ".json");
        await dispatch(loadProductsList());
        setIsLoading(false);
    };

    const { windowWidth } = useWindowDimensions();

    if (isLoading) return <Loader />;

    return (
        <div
            className={
                "adminPanelPageProducts__body" + (isShow ? " active" : "")
            }
        >
            <div className="adminPanelPageProducts__img">
                <img src={product.img} alt="" />
            </div>
            <div className="adminPanelPageProducts__label">
                {limitedText(
                    product.label,
                    windowWidth && windowWidth >= 1240 ? 55 : 40
                )}
            </div>
            <div className="adminPanelPageProducts__quantity">
                {product.quantity} шт.
            </div>
            <div className="adminPanelPageProducts__price">
                {betweenNumberSpacer(product.price)} руб.
            </div>
            <Link to={"/my-shop/admin/" + product._id}>
                <button className="adminPanelPageProducts__button button button_green">
                    Изменить
                </button>
            </Link>
            <button
                className="adminPanelPageProducts__button button"
                onClick={wrapAsyncFunction(handleRemoveProduct)}
            >
                Удалить
            </button>
        </div>
    );
};

export default AdminPanelProduct;
