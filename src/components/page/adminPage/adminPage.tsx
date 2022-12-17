import React from "react";
import "../../../styles/adminPage.scss";
import { useAppSelector } from "../../../hooks/reduxHook";
import { getAllCategories } from "../../../store/categories";
import AdminPanelCategory from "./adminPanelCategory";
import { Link } from "react-router-dom";

const AdminPage = () => {
    const categories = useAppSelector(getAllCategories());

    return (
        <div className="adminPanelPage">
            <h1 className="adminPanelPage__header">Панель администратора</h1>
            <Link to="/my-shop/admin/create">
                <button className="button">Создать новый продукт</button>
            </Link>
            <div>
                {categories.map((category) => (
                    <AdminPanelCategory
                        key={category._id}
                        category={category}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
