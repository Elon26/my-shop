import React, { useEffect } from "react";
import SubCategoryCard from "../../common/subCategoryCard";
import "../../../styles/categoryPage.scss";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHook";
import {
    getCategoriesLoadingStatus,
    getCategory
} from "../../../store/categories";
import { getSubCategories } from "../../../store/subCategories";

interface CategoryPageProps {
    categoryName: string;
}

const CategoryPage = ({ categoryName }: CategoryPageProps) => {
    const category = useAppSelector(getCategory(categoryName));
    const isLoading = useAppSelector(getCategoriesLoadingStatus());
    const subCategories = useAppSelector(getSubCategories(categoryName));

    const history = useHistory();
    useEffect(() => {
        if (!isLoading && !category) {
            history.push("/my-shop/404/");
        }
    }, [category]);

    return (
        <>
            {category && (
                <>
                    <h1 className="mainHeader">{category.label}</h1>
                    <div className="categoryRow">
                        {subCategories.map((subCategory) => (
                            <SubCategoryCard
                                key={subCategory._id}
                                name={subCategory.name}
                                img={subCategory.img}
                                label={subCategory.label}
                                categoryName={category.name}
                            />
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default CategoryPage;
