import React from "react";
import { Link } from "react-router-dom";
import "../../styles/categoryPage.scss";

interface SubCategoryPageProps {
    name: string;
    img: string;
    label: string;
    categoryName: string;
}

const SubCategoryCard = ({
    name,
    img,
    label,
    categoryName
}: SubCategoryPageProps) => {
    const subCategoryUrl =
        "/my-shop/categories/" + categoryName + "/" + name + "/";

    return (
        <div className="subCategoryCard">
            <div className="subCategoryCard__body">
                <Link className="subCategoryCard__img" to={subCategoryUrl}>
                    <img src={img} alt={label} />
                </Link>
                <Link to={subCategoryUrl} className="subCategoryCard__label">
                    {label}
                </Link>
            </div>
        </div>
    );
};

export default SubCategoryCard;
