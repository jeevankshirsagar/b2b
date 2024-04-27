import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import s from './Instagram.module.scss';
import insta1 from "public/images/e-commerce/home/insta1.png";
import insta2 from "public/images/e-commerce/home/insta2.png";
import insta3 from "public/images/e-commerce/home/insta3.png";
import insta4 from "public/images/e-commerce/home/insta4.png";
import insta5 from "public/images/e-commerce/home/insta5.png";
import insta6 from "public/images/e-commerce/home/insta6.png";

const InstagramWidget = () => {
    const settings = {
        dots: false,
        infinite: true, // Try setting to true
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: false
    };

    return (
        <div className={`${s.slider} my-slider`}>
            <Slider {...settings}>
                <div className={s.sliderItem}>
                    <img src={insta1} alt="Instagram" />
                </div>
                <div className={s.sliderItem}>
                    <img src={insta2} alt="Instagram" />
                </div>
                <div className={s.sliderItem}>
                    <img src={insta3} alt="Instagram" />
                </div>
                <div className={s.sliderItem}>
                    <img src={insta4} alt="Instagram" />
                </div>
                <div className={s.sliderItem}>
                    <img src={insta5} alt="Instagram" />
                </div>
                <div className={s.sliderItem}>
                    <img src={insta6} alt="Instagram" />
                </div>
            </Slider>
        </div>
    );
};

export default InstagramWidget;
