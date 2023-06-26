import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

interface SlideProps {
    img: string;
}

const Slide = ({ img }: SlideProps) => {
    return (
        <div className="mainSlider__slide">
            <img src={img} alt="Акция" />
        </div>
    );
};

export default Slide;
