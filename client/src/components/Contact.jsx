import React from 'react';
import {motion} from "framer-motion";
import {Header} from "../components/index";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { HomeOptions } from '../assets/img/index';



const Contact = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_35ip1n8', 'template_9phl1ci', form.current, {
        publicKey: 'AmMaHgQLxq3JZIxdu',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
      e.target.reset()
  };



  return (

    <motion.div
    initial={{ opacity: 0, translateX: -50 }}
    animate={{ opacity: 1, translateX: 0 }}
    transition={{ duration: 0.30, delay: 0.6 }}
    className="w-full h-full flex flex-col pt-20 md:pt-24 px-5 items-center justify-center gap-6 "
  >
    <Header />

    <footer id="FooterSection" className="pt-10">
      {/* Bloc principal avec l'image et la newsletter */}
      {/* Left Content */}
      <motion.div
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
              className="max-w-8xl  mx-auto px-4 grid md:grid-cols-2 gap-8 items-center"
             >
      
        {/* Image de gauche */}
        <div className="relative bg-white/20 backdrop-blur-sm  shadow-xl rounded-lg overflow-hidden  border-red-500 shadow-red-400  p-4  border border-white/30">
        
          <img src={HomeOptions} alt="Preview" className="w-full object-cover rounded-md" />
        </div>
        
        
        {/* Bloc newsletter */}
        <div className="max-h-[30vhd]  p-20 rounded-lg shadow-md text-center relative bg-red-100  overflow-hidden border border-white/30">
    <h2 className="text-5xl mt-10 font-playfair-display-Ds text-[#d64538] mb-6">Conatct Us</h2>
    <p className="mb-4 text-[#cf4229] font-Kodchasan">We welcome contributions from the community!</p>
    <form ref={form} onSubmit={sendEmail}>
    <input
      type="text"
      name="user_name" 
      placeholder="Enter your Name"
      className="border text-red-600 border-red-700 font-Kodchasan rounded px-4 py-2 w-full mb-4 bg-transparent"
    />
    <input
      type="email"
      name="user_email"
      placeholder="Enter your email"
      className="border text-red-600 border-red-700 font-Kodchasan rounded px-4 py-2 w-full mb-4 bg-transparent"
    />
    <textarea
      name="message" 
      placeholder="Your contibution"
      className="border text-red-600 border-red-700 font-Kodchasan rounded px-4 py-2 w-full mb-4 bg-transparent"
    />
    <button type="submit" value="Send"  className="bg-[#f13921] text-white px-10 py-2 rounded-lg font-Inter hover:bg-[#fb574b]">
      Contact Us
    </button>
    </form>
  </div>


        </motion.div> 

     
    </footer>
    </motion.div> 
  );
}

export default Contact;