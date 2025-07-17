import React from "react";
import { motion } from "framer-motion";
import { bgDikr, AboutHomeOptions, Aboutimage } from "../assets/img/index";

const AboutSection = () => {
    return(
        <section id="AboutSection" className='relative min-h-[94vh] py-20 bg-gradient-to-br from-orange-200 via-orange-400 to-red-200 px-4 sm:px-8 lg:px-16 overflow-hidden'>
            {/* Background Image */}
            <div className="absolute inset-0 opacity-20">
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

            <div className='relative z-10 max-w-7xl mx-auto h-full flex flex-col'>
                {/* Main Content - Top Section */}
                <div className="flex-1 flex items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -70 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 2 }}
                        viewport={{ once: true }}
                        className="w-full space-y-8"
                    >
                        {/* Header */}
                        <div className="text-center lg:text-left">
                            <h2 className='text-7xl sm:text-7xl lg:text-8xl font-bold font-Poppins text-orange-500 mb-4'>
                                About Us
                            </h2>
                            <p className='text-lg text-red-700 ml-2 font-Poppins font-medium'>
                                accessible, anytime, anywhere.
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-6">
                            <h3 className='text-3xl sm:text-4xl lg:text-5xl font-bold font-Poppins text-red-800 leading-tight'>
                                Spiritual impact
                            </h3>
                            
                            <h4 className='text-2xl sm:text-3xl font-semibold font-Poppins text-orange-600'>
                                "Whether at home, work, or travel."
                            </h4>
                            
                            <p className='text-lg text-red-700 font-Inter leading-relaxed max-w-2xl'>
                                Building a global community united by the love of Quran and remembrance of Allah.
                            </p>

                            {/* Call to action */}
                            <div className="pt-4">
                                <button className='bg-gradient-to-r from-[#FF4800] to-[#ff936b] hover:from-[#e63900] hover:to-[#ff8252] text-white font-Poppins px-8 py-3 rounded-full text-lg transition-all duration-200 hover:shadow-2xl transform hover:scale-105'>
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Card Image with Opacity Flow */}
                <div className="relative w-full mt-16 -mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="relative w-full"
                    >
                        <div className="shadow-cards relative w-full bg-white/10 backdrop-blur-sm rounded-t-2xl p-3 border border-white/20 overflow-hidden pb-0">
                            {/* Orange shadow at top of image */}
                            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-orange-500/30 to-transparent rounded-t-xl"></div>
                            
                            {/* Image covering full space and extending to section bottom */}
                            <img
                                src={Aboutimage}
                                alt="Dikr Playlist Interface"
                                className="w-full h-auto object-cover rounded-t-xl shadow-lg border-2 border-b-0"
                            />
                            
                            {/* White gradient overlay - clear top, opaque bottom */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-orange-200/60 rounded-t-xl"></div>
                            
                            {/* Additional gradient for smooth blending with section background */}
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-orange-200 via-orange-300/80 to-transparent"></div>
                        </div>

                        {/* Background decoration with orange shadow */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/25 to-red-400/25 rounded-3xl -z-10 blur-xl"></div>
                        
                        {/* Top orange shadow */}
                        <div className="absolute -top-2 left-0 right-0 h-6 bg-gradient-to-b from-orange-500/20 to-transparent rounded-t-2xl -z-5"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection;