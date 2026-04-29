import React from 'react';
import Hero from './hero';
import Cards from '../components/cards';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';

import './home.css';


import { Pagination } from 'swiper/modules';
import { FaE } from 'react-icons/fa6';

const Home = () => {
     const categories=["laptops","smartphones","mobile-accessories","tablets"]
    const [products, setProducts] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      const results = await Promise.all(
        categories.map(async (cat) => {
          const res = await fetch(`https://dummyjson.com/products/category/${cat}`);
          const data = await res.json();

      

          return {cat,products: data.products} 
        })
      );

      console.log("RESULTS:", results);

      const allcategrical_prod = results

      setProducts(allcategrical_prod);

    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, []);



  return (
    <>
    <Hero/>

   <div className='new-product-section'>

    <div></div>
      {products.map(section => (
         <>
         <h1>{section.cat}</h1>
         <div className='cards-section'>
        <Swiper
          key={section.cat} 
          spaceBetween={30}
           slidesPerView={3}
          grabCursor={true}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
        
           
          {section.products.map(product => (
            <>
              
            <SwiperSlide key={product.id}>
             <Cards
                name={product.title}
                category={product.category}
                price={product.price}
                img={product.thumbnail}
                id={product.id}
            />
            </SwiperSlide>
           </>
          ))}
        </Swiper>
        </div>
         </>
      ))}
      </div>
    </>
  );
};

export default Home;
