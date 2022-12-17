import React from "react";
import { Link } from "react-router-dom";
import { ISubCategory } from "../../../models";

interface CategoriesForMainPageProps {
    name: string;
    label: string;
    img: string;
    subCategories: ISubCategory[];
}

const CategoriesForMainPage = ({
    name,
    img,
    label,
    subCategories
}: CategoriesForMainPageProps) => {
    const categoryUrl = "/my-shop/categories/" + name + "/";

    return (
        <div className="category">
            <div className="category__body">
                <Link className="category__img" to={categoryUrl}>
                    <img src={img} alt={label} />
                </Link>
                <div>
                    <Link to={categoryUrl} className="category__label">
                        {label}
                    </Link>
                    <div className="category__subCategoryArea">
                        {subCategories.map((subCategory) => (
                            <Link
                                key={subCategory._id}
                                to={categoryUrl + subCategory.name + "/"}
                                className="category__subCategory"
                            >
                                {subCategory.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesForMainPage;
