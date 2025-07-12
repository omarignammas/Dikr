import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import ReciterCardHome from './ReciterCardHome';

// Version alternative avec effet Coverflow
const CoverflowReciterSwiper = ({ allReciters }) => {

  
    // Configuration responsive
    const breakpoints = {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 60,
      }
    };
  
    
    return (
      <div className="relative py-8">
        <Swiper
          modules={[Autoplay, EffectCoverflow, Pagination]}
          effect="coverflow"
          
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={5}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
          }}
          className="pb-12"
        >
          {(allReciters?.Reciters)?.map((data, i) => (
            <SwiperSlide key={data._id}>
              {({ isActive }) => (
                <ReciterCardHome 
                  data={data} 
                  index={i} 
                  isCenter={isActive}
                  isActive={isActive}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };


  export default CoverflowReciterSwiper;