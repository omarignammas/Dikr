import React from "react";
import { useEffect } from "react";
import { getAllReciters } from "../api";
import { useStatevalue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { motion } from "framer-motion";
import {AutoReciterSwiper} from "../components/index";
import { ParallaxLayer } from "@react-spring/parallax";
import BlurText from "./BlurText";



const RecitersSection = () => {

    const [{allReciters},dispatch] = useStatevalue();

    useEffect(() => {
      // console.log(allReciters)
      if (!allReciters) {
        getAllReciters().then((data) => {
          dispatch({
            type: actionType.SET_ALL_RECITERS,
            allReciters: data 
          });
        });
      }
    }, [allReciters,dispatch]);
    
    const handleAnimationComplete = () => {
        console.log('Animation completed!');
      };

    return(
        <section id="RecitersSection" className='relative min-h-[90vh] py-28  bg-gradient-to-tr from-orange-300 via-red-500 to-orange-300 px-4 sm:px-8 lg:px-16'>
   
        {/* Background Pattern */} 
        <div className="absolute inset-0  opacity-10">

          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`
          }}>
          </div>

        </div>

        <div className='relative z-10 max-w-7xl mx-auto'>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
            viewport={{ once: true }}
            className='text-center mb-11'
          >
          <BlurText
           text="Featured Reciters"
           delay={180}
           animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="className='text-3xl sm:text-5xl lg:text-6xl font-semibold font-Kodchasan ml-[30%] mt-10 text-white mb-4"
         />

        <BlurText
           text="Discover the voices that have touched millions of hearts around the world."
           delay={100}
           animateBy="words"
           direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-sm ml-[30%] text-orange-200 max-w-3xl mx-auto leading-relaxed font-Kodchasan"
         />
         <BlurText
           text="Each reciter brings their unique style and spiritual depth to the Holy Quran."
           delay={100}
           animateBy="words"
           direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-sm ml-[30%] text-orange-200 max-w-3xl mx-auto leading-relaxed font-Kodchasan"
         />
        
            

             <AutoReciterSwiper allReciters={allReciters} />


            <button className='bg-gradient-to-r from-[#FF4800] to-[#ff936b] hover:from-[#e63900] hover:to-[#ff8252] text-white font-Questria px-4 py-4 rounded-full text-sm transition-all duration-200 hover:shadow-2xl transform hover:scale-105 flex items-center gap-3 mx-auto'>
              View All Reciters
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>
    )
}
export default RecitersSection ;