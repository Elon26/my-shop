import React from "react";
import { useParams } from "react-router-dom";
import CategoryPage from "../../components/page/categoryPage";
import ProductPage from "../../components/page/productPage";
import SubCategoryPage from "../../components/page/subCategoryPage";

const СategoriesPage = () => {
    const { category, subCategory, product } = useParams<{
        category: string;
        subCategory: string;
        product: string;
    }>();

    return (
        <>
            {subCategory ? (
                product ? (
                    <ProductPage productName={product} />
                ) : (
                    <SubCategoryPage subCategoryName={subCategory} />
                )
            ) : (
                <CategoryPage categoryName={category} />
            )}
        </>
    );
};

export default СategoriesPage;
