import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { getPopularProducts } from "../../../store/products";
import { useAppSelector } from "../../../hooks/reduxHook";
import Slide from "./Slide";
import Arrows from "./Arrows";
import "../../../styles/popularSlider.scss";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";

const PopularSlider = (): React.ReactElement => {
    const popularProducts = useAppSelector(getPopularProducts());
    const { windowWidth } = useWindowDimensions();

    return (
        <div className="popularSlider">
            <h2 className="popularSlider__title">Популярные товары</h2>
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={windowWidth && windowWidth > 768 ? 3 : 1}
                centeredSlides={true}
                loop={true}
                navigation={false}
            >
                {popularProducts.map(product => (
                    <SwiperSlide key={product._id + Date.now().toString()}>
                        <Slide product={product} />
                    </SwiperSlide>
                ))}
                <Arrows />
            </Swiper>
        </div >
    );
};

export default PopularSlider;
