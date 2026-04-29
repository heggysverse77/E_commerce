import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import "./hero.css";
import 'swiper/css';
import 'swiper/css/pagination';

import Hero2 from  '../assets/headset.png';
import iPhoneImg from '../assets/iphone.png';
import LaptopImg from '../assets/laptop.png';


const Hero = () => {
    return (
        <>
        <div className="hero-top">

    <div className="container">

        <div className="slider">
            
       <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className="hero-slide slide-1"> 
        <div className="hero-content"> 
            <h2 className="hero-title">Premium Sound</h2>
            <p className="hero-description">Experience crystal clear audio with our latest wireless headsets.</p>
            <button className="hero-btn"> 
                <a href="#">Shop Now</a>
            </button>
        </div>
        <div className="hero-image">
            <img src={Hero2} alt="Headset" />
        </div>
        </SwiperSlide>

        <SwiperSlide className="hero-slide slide-2"> 
        <div className="hero-content"> 
            <h2 className="hero-title">iPhone 15 Pro</h2>
            <p className="hero-description">The ultimate smartphone experience. Now with a stunning new design and powerful features.</p>
            <button className="hero-btn"> 
                <a href="#">View iPhone</a>
            </button>
        </div>
        <div className="hero-image">
            <img src={iPhoneImg} alt="iPhone Mockup" />
        </div>
        </SwiperSlide>

        <SwiperSlide className="hero-slide slide-3"> 
        <div className="hero-content"> 
            <h2 className="hero-title">MacBook Pro</h2>
            <p className="hero-description">Unleash your creativity with the most powerful laptop ever built for professionals.</p>
            <button className="hero-btn"> 
                <a href="#">Shop Laptops</a>
            </button>
        </div>
        <div className="hero-image">
            <img src={LaptopImg} alt="Laptop Mockup" />
        </div>
        </SwiperSlide>
     
      </Swiper> 
        </div>

    </div>
</div>



        </>
    );
};

export default Hero;