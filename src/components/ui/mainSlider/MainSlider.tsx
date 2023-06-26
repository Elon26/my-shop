import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import Slide from "./Slide";
import Arrows from "./Arrows";
import "../../../styles/mainSlider.scss";

const MainSlider = (): React.ReactElement => {
    const imgs = [
        "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/mainslider%2Fmainslider-1.jpg?alt=media&token=3da39ea9-1c35-4825-9855-603c09967e43",
        "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/mainslider%2Fmainslider-2.jpg?alt=media&token=f8f0b0ec-9665-4e64-9910-d81628902ae7",
        "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/mainslider%2Fmainslider-3.jpg?alt=media&token=baa62a77-cea7-48a6-9d25-ba0b4892d1a3",
        "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/mainslider%2Fmainslider-4.jpg?alt=media&token=95b85266-c318-4d24-b7e2-44ddb0ce45b0",
        "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/mainslider%2Fmainslider-5.jpg?alt=media&token=9acbb747-688f-4294-b5d5-5c98d81179bb"
    ];

    return (
        <div className="mainSlider">
            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                navigation={false}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false
                }}
            >
                {imgs.map(img => (
                    <SwiperSlide key={img + Date.now().toString()}>
                        <Slide img={img} />
                    </SwiperSlide>
                ))}
                <Arrows />
            </Swiper>
        </div >
    );
};

export default MainSlider;
