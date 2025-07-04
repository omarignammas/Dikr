import React from "react";
import { HomeOptions } from "../assets/img/index";
import { motion } from "framer-motion";
import {NewsletterForm} from "../components/index";

const FooterSection = () => {
  return (
    <footer id="FooterSection" className=" bg-gradient-to-br  from-orange-200 via-orange-300 to-orange-300  pt-10">
      {/* Bloc principal avec l'image et la newsletter */}
      {/* Left Content */}
      <motion.div
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
              className="max-w-8xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center"
             >
      
        {/* Image de gauche */}
        <div className="relative bg-white/20 backdrop-blur-sm  shadow-xl rounded-lg overflow-hidden animate-float border-orange-500 shadow-orange-400  p-4  border border-white/30">
        
          <img src={HomeOptions} alt="Preview" className="w-full object-cover rounded-md" />
        </div>
        
        
        {/* Bloc newsletter */}
        <NewsletterForm/>


        </motion.div> 

      {/* Liens en bas */}
      <div className="mt-12 border-t border-orange-100 pt-10 pb-6">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-5 gap-6 text-sm text-[#6B4C3B]">
          <div>
            <h4 className="font-semibold font-Kodchasan mb-3">Address</h4>
            <p>+212648364140</p>
            <p>877 Hay Riad, Rabat</p>
            <p>14568, Morocco</p>
          </div>

          <div>
            <h4 className="font-semibold font-Kodchasan mb-3">My Account</h4>
            <p>Sign in</p>
            <p>Register</p>
            <p>Order status</p>
          </div>

          <div>
            <h4 className="font-semibold font-Kodchasan mb-3">Help</h4>
            <p>Shipping</p>
            <p>Returns</p>
            <p>Sizing</p>
          </div>

          <div>
            <h4 className="font-semibold font-Kodchasan mb-3">Shop</h4>
            <p>All Products</p>
            <p>Bedroom</p>
            <p>Dining Room</p>
          </div>

          <div>
            <h4 className="font-semibold font-Kodchasan mb-3">Legal Stuff</h4>
            <p>Shipping & Delivery</p>
            <p>Terms & Conditions</p>
            <p>Privacy & Policy</p>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-orange-700">
          ©2025 Dikr. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
