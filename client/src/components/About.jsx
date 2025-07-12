import React from 'react';
import { Header } from "../components/index";
import {HomeOptions, RecitersOptions, AboutHomeOptions } from "../assets/img/index";
import { motion } from "framer-motion";
import TiltedCard from './TiltedCard';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.30, delay: 0.6 }}
      className="flex-1 bg-gradient-to-br from-orange-300 via-red-500 to-orange-400  overflow-y-auto mt-20 p-6 flex flex-col items-center gap-6 "
    >
      <Header />
      <div className="text-3xl text-orange-200 font-Kodchasan font-semibold">DIKR APP</div>

      {/* Home Section */}
      <motion.div 
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.40, delay: 0.6 }}
      className="flex flex-col md:flex-row md:justify-center items-center md:gap-6 space-y-6 md:space-y-0 md:space-x-10">
      <div className="Card-Scale relative bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-2xl border border-white/30 hover:shadow-orange-400 hover:border-orange-400">
        <img
          src={HomeOptions}
          alt="Home"
          className="w-full max-w-xl h-auto border-2 object-cover border-red-300 shadow-red-500 rounded-md"
        />
        </div>
        <div className="flex flex-col text-center md:text-left max-w-lg">
          <p className="text-orange-200 font-serif text-2xl font-bold">
            Home - Your Gateway to Spiritual Enlightenment
          </p>
          <p className="text-orange-300 font-serif text-lg font-medium">
            Start Your Journey with Dikr
          </p>
          <p className="text-orange-100 font-serif text-md">
            The Home screen is your gateway to a deeper connection with the Quran. Effortlessly navigate through various features, from daily supplications to Quranic recitations, all designed to bring you closer to your faith. Simple, intuitive, and spiritually uplifting.
          </p>
        </div>
      </motion.div>

      {/* Recites Section */}
      <motion.div 
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.40, delay: 0.6 }}
      className="flex flex-col md:flex-row-reverse md:justify-center items-center md:gap-6 space-y-6 md:space-y-0 md:space-x-10">
        <div className="Card-Scale relative bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-xl hover:shadow-orange-400  hover:border-orange-400 border-white/30">
        <img
          src={AboutHomeOptions}
          alt="Recites"
          className="w-full max-w-xl h-auto border-2 object-cover border-red-300 shadow-lg rounded-md"
        />
        </div>  
        <div className="flex flex-col text-center md:text-right max-w-lg">
          <p className="text-orange-200 font-serif text-2xl font-bold">
            Recites - Personalized Recitations Playlist
          </p>
          <p className="text-orange-300 font-serif text-xl font-medium">
            Your Spiritual Companion
          </p>
          <p className="text-orange-100 font-serif text-md">
            Create and manage personalized playlists tailored to your spiritual journey. Whether you're seeking peace, reflection, or guidance, our app lets you curate recitations that speak to your heart, available anytime, anywhere.
          </p>
        </div>
      </motion.div>

      {/* Reciters Section */}
      <motion.div 
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.40, delay: 0.6 }}
     className="flex flex-col md:flex-row md:justify-center items-center md:gap-6 space-y-6 md:space-y-0 md:space-x-10">
      <div className="Card-Scale relative bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-2xl border border-white/30 hover:shadow-orange-400  hover:border-orange-400">

        <img
          src={RecitersOptions}
          alt="Reciters"
          className="w-full max-w-xl h-auto border-2 mb-6 object-cover border-red-300 shadow-sm rounded-md"
        />
        </div>
        <div className="flex flex-col text-center md:text-left max-w-lg">
          <p className="text-orange-200 font-serif text-2xl font-bold">
            Reciters - Elevate Your Quranic Journey
          </p>
          <p className="text-orange-300 font-serif text-xl font-medium">
            Empower Your Listening Experience
          </p>
          <p className="text-orange-100 font-serif text-md">
            Dive deep into a curated selection of reciters from around the world. Our Dashboard for Reciters offers a seamless interface to explore and select your favorite Quranic recitations. Experience the beauty of the Quran through the voices that resonate with your soul.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
