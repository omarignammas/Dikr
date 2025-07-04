import React,{useRef} from "react";
import emailjs from '@emailjs/browser';


const NewsletterForm = () => {
    
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
    <div className="max-h-[30vhd]  p-20 rounded-lg shadow-md text-center relative bg-white/20 backdrop-blur-md overflow-hidden border border-white/30">
    <h2 className="text-5xl mt-10 font-playfair-display-Ds text-[#ca6135] mb-6">Join Our Newsletter</h2>
    <p className="mb-4 text-[#a24b26] font-Kodchasan">Receive exclusive deals, discounts and many offers.</p>
    <form ref={form} onSubmit={sendEmail}>
    <input
      type="text"
      name="user_name" 
      placeholder="Enter your Name"
      className="border text-orange-600 border-orange-700 font-Kodchasan rounded px-4 py-2 w-full mb-4 bg-transparent"
    />
    <input
      type="email"
      name="user_email"
      placeholder="Enter your email"
      className="border text-orange-600 border-orange-700 font-Kodchasan rounded px-4 py-2 w-full mb-4 bg-transparent"
    />
    <textarea
      name="message" 
      placeholder="Enter your Message"
      className="border text-orange-600 border-orange-700 font-Kodchasan rounded px-4 py-2 w-full mb-4 bg-transparent"
    />
    <button type="submit" value="Send"  className="bg-[#f77335] text-white px-10 py-2 rounded-lg font-Inter hover:bg-[#e25e24]">
      Contact Us
    </button>
    </form>
  </div>
  );
};

export default NewsletterForm;



