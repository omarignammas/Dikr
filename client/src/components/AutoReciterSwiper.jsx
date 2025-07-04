import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import ReciterCardHome from './ReciterCardHome';


// Composant principal Swiper
const AutoReciterSwiper = ({ allReciters }) => {
    const [activeIndex, setActiveIndex] = useState(1); // Start with middle slide active
    const [swiperInstance, setSwiperInstance] = useState(null);
  
    // Configuration responsive
    const breakpoints = {
      320: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
      1280: {
        slidesPerView: 6,
        spaceBetween: 60,
      }
    };
  
    return (
      <div className="relative py-4 sm:py-6 md:py-8">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={70}
          slidesPerView={5}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={900}
          breakpoints={breakpoints}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          className="sm:pb-12 md:pb-14"
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
          
          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 cursor-pointer hover:bg-white/30 transition-all duration-300">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          
          <div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 cursor-pointer hover:bg-white/30 transition-all duration-300">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Swiper>
      
      </div>
    );
  };
  
  
  export default AutoReciterSwiper;
