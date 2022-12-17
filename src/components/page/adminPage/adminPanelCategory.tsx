import React, { useState } from "react";
import { ICategory } from "../../../models";
import { AiFillCaretRight } from "react-icons/ai";
import { getSubCategories } from "../../../store/subCategories";
import { useAppSelector } from "../../../hooks/reduxHook";
import AdminPanelSubCategory from "./adminPanelSubCategory";

interface AdminPanelCategoryProps {
    category: ICategory;
}

const AdminPanelCategory = ({ category }: AdminPanelCategoryProps) => {
    const subCategories = useAppSelector(getSubCategories(category.name));
    const [isShowSubCategories, setIsShowSubCategories] = useState(false);

    return (
        <div className="adminPanelPage__category adminPanelPageCategory">
            <div className="adminPanelPageCategory__body">
                <span
                    className={
                        "adminPanelPageCategory__icon" +
                        (isShowSubCategories ? " active" : "")
                    }
                >
                    {<AiFillCaretRight />}
                </span>
                <span
                    className="adminPanelPageCategory__label"
                    onClick={() =>
                        setIsShowSubCategories((prevState) => !prevState)
                    }
                >
                    {category.label}
                </span>
                <div className="adminPanelPageCategory__subCategory adminPanelPageSubCategory">
                    {subCategories.map((subCategory) => (
                        <AdminPanelSubCategory
                            key={subCategory._id}
                            subCategory={subCategory}
                            isShow={isShowSubCategories}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPanelCategory;
