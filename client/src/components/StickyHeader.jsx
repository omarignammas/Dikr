
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Composant Header Sticky
const StickyHeader = ({ isVisible, onScrollTo }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-red-100"
        >
          <div className="flex justify-between items-center p-3 lg:p-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="ml-2 font-bold text-red-600 text-lg">Dikr</span>
            </div>

            {/* Navigation */}
            <div className="hidden lg:flex gap-8 text-lg">
              <button 
                onClick={onScrollTo?.home}
                className="text-red-600 hover:text-red-800 font-medium transition-colors"
              >
                Home
              </button>
              <button 
                onClick={onScrollTo?.reciters}
                className="text-red-600 hover:text-red-800 font-medium transition-colors"
              >
                Reciters
              </button>
              <button 
                onClick={onScrollTo?.about}
                className="text-red-600 hover:text-red-800 font-medium transition-colors"
              >
                About
              </button>
              <button 
                onClick={onScrollTo?.contact}
                className="text-red-600 hover:text-red-800 font-medium transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Sign Up Button */}
            <button className="bg-gradient-to-br from-[#FF4800] to-[#FFA784] hover:bg-red-500 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 hover:shadow-lg">
              Sign Up
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyHeader;