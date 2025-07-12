import React from "react";
import { motion } from "framer-motion";
import { bgDikr,AboutHomeOptions } from "../assets/img/index";


const AboutSection = () => {

    return(
        <section id="AboutSection" className='relative min-h-[94vh] py-20 bg-gradient-to-br  from-orange-200 via-orange-400 to-red-200  px-4 sm:px-8 lg:px-16 overflow-hidden'>
        {/* Background Image */}
        
        <div  className="absolute inset-0 opacity-20">
        
          <img 
            src={bgDikr} 
            alt="background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-300 via-orange-200 to-red-200"></div>
        </div>
     
        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-orange-500 rounded-full animate-pulse opacity-40"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-red-500 rounded-full animate-bounce opacity-40"></div>
          <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-orange-600 rounded-full animate-ping opacity-40"></div>
          <div className="absolute bottom-60 right-40 w-2.5 h-2.5 bg-red-400 rounded-full animate-pulse opacity-30"></div>
        </div>

        <div className='relative z-10 max-w-7xl mx-auto'>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="text-center lg:text-left">
                <h2 className='text-6xl sm:text-6xl lg:text-7xl font-bold font-Kodchasan text-orange-500 mb-4'>
                  About Us
                </h2>
                <p className='text-lg text-red-700 font-Questria font-medium'>
                  accessible, anytime, anywhere.
                </p>
              </div>

              {/* Main Content */}
              <div className="space-y-6">
                <h3 className='text-3xl sm:text-4xl lg:text-5xl font-bold font-Kodchasan text-red-800 leading-tight'>
                  Spiritual impact
                </h3>
                
                <h4 className='text-2xl sm:text-3xl font-semibold font-Kodchasan text-orange-600'>
                  "Whether at home, work, or travel."
                </h4>
                
                <p className='text-lg text-red-700 font-Inter leading-relaxed max-w-2xl'>
                  Building a global community united by the love of Quran and remembrance of Allah.
                </p>

                {/* Call to action */}
                <div className="pt-4">
                  <button className='bg-gradient-to-r from-[#FF4800] to-[#ff936b] hover:from-[#e63900] hover:to-[#ff8252] text-white font-Questria px-8 py-3 rounded-full text-lg transition-all duration-200 hover:shadow-2xl transform hover:scale-105'>
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/30">
                <img
                  src={AboutHomeOptions}
                  alt="Dikr Playlist Interface"
                  className="w-full h-auto rounded-xl shadow-lg border-2 "
                />
                
                {/* Floating UI Elements */}
                <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-orange-200">
                  <svg className="w-6 h-6 shadow-sm text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full px-4 py-2 shadow-lg font-Questria text-sm">
                  24/7 Available
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-3xl -z-10 blur-xl"></div>
            </motion.div>

          </div>
        </div>
      </section>

    )
}
export default AboutSection;