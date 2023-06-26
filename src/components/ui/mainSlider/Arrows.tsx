import React from "react";
import { useSwiper } from "swiper/react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const Arrows = (): React.ReactElement => {
    const swiper = useSwiper();

    return (
        <div className="mainSlider__arrowsCont">
            <div className="mainSlider__arrowsRow">
                <button
                    className="mainSlider__arrow mainSlider__arrow_prev"
                    onClick={() => swiper.slidePrev()}
                >
                    <BsChevronCompactLeft />
                </button>
                <button
                    className="mainSlider__arrow mainSlider__arrow_next"
                    onClick={() => swiper.slideNext()}
                >
                    <BsChevronCompactRight />
                </button>
            </div>
        </div >
    );
};

export default Arrows;
