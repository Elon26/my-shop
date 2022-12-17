import React, { useState } from "react";
import { ISubCategory } from "../../../models";
import { AiFillCaretRight } from "react-icons/ai";
import { useAppSelector } from "../../../hooks/reduxHook";
import { getProducts } from "../../../store/products";
import AdminPanelProduct from "./adminPanelProduct";

interface AdminPanelSubCategoryProps {
    subCategory: ISubCategory;
    isShow: boolean;
}

const AdminPanelSubCategory = ({
    subCategory,
    isShow
}: AdminPanelSubCategoryProps) => {
    const products = useAppSelector(getProducts(subCategory.name));
    const [isShowProducts, setIsShowProducts] = useState(false);

    return (
        <div
            className={
                "adminPanelPageSubCategory__body" + (isShow ? " active" : "")
            }
        >
            <span
                className={
                    "adminPanelPageSubCategory__icon" +
                    (isShowProducts ? " active" : "")
                }
            >
                <AiFillCaretRight />
            </span>
            <span
                className="adminPanelPageSubCategory__label"
                onClick={() => setIsShowProducts((prevState) => !prevState)}
            >
                {subCategory.label}
            </span>
            <div className="adminPanelPageSubCategory__products adminPanelPageProducts">
                {products.map((product) => (
                    <AdminPanelProduct
                        key={product._id}
                        product={product}
                        isShow={isShowProducts}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminPanelSubCategory;
