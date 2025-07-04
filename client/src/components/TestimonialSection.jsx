import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Hannah Schmitt",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    date: "May 8, 2024",
    text: "Excellent service, the recitations are beautiful and the app is easy to use. Highly recommended!"
  },
  {
    name: "Ali Ben Salah",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    rating: 4,
    date: "April 18, 2024",
    text: "Très belle interface et les récitateurs sont bien sélectionnés. Il manque juste quelques fonctionnalités mineures."
  },
  {
    name: "Sara El Amrani",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    date: "June 2, 2024",
    text: "J'adore cette application, je l'utilise tous les jours pour écouter le Coran."
  }
];

const TestimonialSection = () => {
  return (
    <div className="bg-gradient-to-tr from-orange-300 via-red-400 to-orange-300 px-4 sm:px-8 lg:px-16 py-16  min-h-[60vh] text-center">
      <h2 className="text-4xl font-bold text-orange-600 mb-2">Testimonials</h2>
      <p className="text-gray-600 mb-10">Over 15,000 happy customers.</p>

      <div className="max-w-4xl mx-auto">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={40}
          slidesPerView={1}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-md p-6 rounded-xl text-left max-w-3xl mx-auto">
                <div className="flex items-center mb-4 gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-orange-300"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                    <div className="flex items-center text-orange-400">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                          key={i}
                          className={i < item.rating ? "text-orange-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">{item.text}</p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialSection;
