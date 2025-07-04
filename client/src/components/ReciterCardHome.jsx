import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import {Card, CardFooter} from "@heroui/card";
import {Image} from "@heroui/image";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Composant ReciterCardHome modifié pour gérer les états
const ReciterCardHome = ({ data, index, isCenter, isActive }) => {
  return (
    <div className={`
        relative w-200 transition-all duration-500 ease-in-out transform
        ${isCenter ? 'scale-104 z-10' : 'scale-90 opacity-75'}
        ${isActive ? 'shadow-3xl' : 'shadow-lg'}
      `}>
        {/* Contenu de votre carte */}
      
      <div className="rounded-lg overflow-hidden bg-gradient-to-b from-transparent to-black/20">
        <div className="relative group">
        <motion.div
        initial={{ opacity: 0, translateX: -50 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Card isFooterBlurred className="border-none shadow-lg" radius="lg">
          <Image
            alt="Album cover"
            className="object-cover"
            height={200}
            src={data?.imageURL}
            width={200}
          />
          <CardFooter className="justify-between before:bg-white/10  border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-grey/120">{data.name}</p>
          </CardFooter>

        
        </Card>
      </motion.div>

          
          {/* Overlay gradient */}
          <div className={`
            absolute inset-0 bg-gradient-to-t transition-all duration-300
            ${isCenter ? 'from-black/70 via-transparent to-transparent' : 'from-black/50 via-transparent to-transparent'}
          `} />
          

          {/* Text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className={`
              text-white font-medium text-center transition-all duration-300
              ${isCenter ? 'text-xl font-bold' : 'text-lg'}
            `}>
              {data?.name || "Nom inconnu"}
            </h3>
        
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReciterCardHome;