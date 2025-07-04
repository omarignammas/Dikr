import React from 'react';
import { Header } from "../components/index";
import { Home, DashReciters, DashRecites } from "../assets/img/index";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.30, delay: 0.6 }}
      className="flex-1 overflow-y-auto mt-20 p-6 flex flex-col items-center gap-6 bg-primary"
    >
      <Header />
      <div className="text-2xl text-red-500 italic font-semibold">DIKR APP</div>

      {/* Home Section */}
      <motion.div 
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.40, delay: 0.6 }}
      className="flex flex-col md:flex-row md:justify-center items-center md:gap-6 space-y-6 md:space-y-0 md:space-x-10">
        <img
          src={Home}
          alt="Home"
          className="w-full max-w-xl h-auto border-2 object-cover border-red-300 shadow-red-500 rounded-md"
        />
        <div className="flex flex-col text-center md:text-left max-w-lg">
          <p className="text-red-500 font-serif text-xl font-bold">
            Home - Your Gateway to Spiritual Enlightenment
          </p>
          <p className="text-red-400 font-serif text-lg font-medium">
            Start Your Journey with Dikr
          </p>
          <p className="text-gray-400 font-serif text-md">
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
        <img
          src={DashRecites}
          alt="Recites"
          className="w-full max-w-xl h-auto border-2 object-cover border-red-300 shadow-lg rounded-md"
        />
        <div className="flex flex-col text-center md:text-right max-w-lg">
          <p className="text-red-500 font-serif text-xl font-bold">
            Recites - Personalized Recitations Playlist
          </p>
          <p className="text-red-400 font-serif text-xl font-medium">
            Your Spiritual Companion
          </p>
          <p className="text-gray-400 font-serif text-md">
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
        <img
          src={DashReciters}
          alt="Reciters"
          className="w-full max-w-xl h-auto border-2 mb-6 object-cover border-red-300 shadow-sm rounded-md"
        />
        <div className="flex flex-col text-center md:text-left max-w-lg">
          <p className="text-red-500 font-serif text-xl font-bold">
            Reciters - Elevate Your Quranic Journey
          </p>
          <p className="text-red-400 font-serif text-xl font-medium">
            Empower Your Listening Experience
          </p>
          <p className="text-gray-400 font-serif text-md">
            Dive deep into a curated selection of reciters from around the world. Our Dashboard for Reciters offers a seamless interface to explore and select your favorite Quranic recitations. Experience the beauty of the Quran through the voices that resonate with your soul.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
