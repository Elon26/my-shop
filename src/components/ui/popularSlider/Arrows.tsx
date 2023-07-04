import React from "react";
import { useSwiper } from "swiper/react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const Arrows = (): React.ReactElement => {
    const swiper = useSwiper();

    return (
        <div className="popularSlider__arrowsCont">
            <div className="popularSlider__arrowsRow">
                <button
                    className="popularSlider__arrow popularSlider__arrow_prev"
                    onClick={() => swiper.slidePrev()}
                >
                    <BsChevronCompactLeft />
                </button>
                <button
                    className="popularSlider__arrow popularSlider__arrow_next"
                    onClick={() => swiper.slideNext()}
                >
                    <BsChevronCompactRight />
                </button>
            </div>
        </div >
    );
};

export default Arrows;
