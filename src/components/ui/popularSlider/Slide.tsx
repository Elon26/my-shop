import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { IProduct } from "../../../models";
import { Link } from "react-router-dom";

interface SlideProps {
    product: IProduct;
}

const Slide = ({ product }: SlideProps) => {
    const productUrl =
        "/my-shop/categories/" +
        product.categoryName +
        "/" +
        product.subCategoryName +
        "/" +
        product.name +
        "/";

    return (
        <Link to={productUrl} className="popularSlider__slide">
            <img className="popularSlider__img" src={product.img} alt={product.label} />
            <div className="popularSlider__label">{product.label}</div>
        </Link>
    );
};

export default Slide;
