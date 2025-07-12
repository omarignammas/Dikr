import React from 'react';
import {app} from '../config/firebase.config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect,useRef } from 'react';
import { actionType } from '../context/reducer';
import { useStatevalue } from '../context/StateProvider';
import { ValidateUser } from '../api';
import {bgDikr, RecitersOptions} from '../assets/img/index'
import {Logo} from '../assets/img/index'
import Typewriter from './Typewriter';
import {motion} from 'framer-motion';
import { useState } from 'react';
import { Home } from '../assets/img/index';
import { NavbarLandingPage,AboutSection ,RecitersSection, FooterSection} from '../components/index';
import {UseScrollPosition} from "../Hooks/UseScrollPosition";
import { NavLink } from 'react-router-dom';


function FloatingDots() {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const generateDots = () => {
      const newDots = [];
      for (let i = 0; i < 18; i++) {
        newDots.push({
          id: i,
          size: Math.random() * 5 + 2,
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 5,
          duration: Math.random() * 6 + 6,
          opacity: Math.random() * 0.6 + 0.5,
        });
      }
      setDots(newDots);
    };

    generateDots();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-gradient-to-tr from-red-700 via-red-600 to-red-500 cursor-pointer transition-all duration-300 ease-out hover:scale-[2] hover:opacity-100 hover:z-50 hover:brightness-150 hover:saturate-150"
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            opacity: dot.opacity,
            animation: `floatDot ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
            boxShadow: `0px 2px 10px 3px #FF4800`,
            filter: 'brightness(1) saturate(1)',
          }}
          onMouseEnter={(e) => {
            e.target.style.animationPlayState = 'paused';
            e.target.style.boxShadow = `
              0 0 30px rgba(255, 72, 0, 0.8), 
              0 0 60px rgba(255, 72, 0, 0.4),
              0 0 90px rgba(255, 72, 0, 0.2)
            `;
            e.target.style.filter = 'brightness(2) saturate(2) drop-shadow(0 0 15px rgba(255, 72, 0, 0.8))';
          } }
          onMouseLeave={(e) => {
            e.target.style.animationPlayState = 'running';
            e.target.style.boxShadow = `0 2px 8px rgba(239, 68, 68, 0.2)`;
            e.target.style.filter = 'brightness(1) saturate(1)';
          } } />
      ))}

      <style jsx>{`
        @keyframes floatDot {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          25% {
            transform: translateY(-30px) translateX(25px) scale(1.2);
          }
          50% {
            transform: translateY(-15px) translateX(-25px) scale(0.8);
          }
          75% {
            transform: translateY(-40px) translateX(17px) scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}



const Login = ({Setauth}) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const Navigate = useNavigate();
  const [{user},dispatch] = useStatevalue();


  useEffect(() => {
    if(window.localStorage.getItem("auth") === "true"){
      Navigate("/Home",{replace:true});
    }  
  }, [])
    
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider).then((userCred) => {
      if(userCred){
        window.localStorage.setItem("auth","true");
        auth.onAuthStateChanged((userCred) => {
          if(userCred){
            userCred.getIdToken().then((token)=>{
              ValidateUser(token).then((data)=> {
                dispatch({
                  type : actionType.SET_USER,
                  user : data
                });
              });
            })
            Navigate('/Home',{replace :'true'});
          }
          else{
            Setauth && Setauth(false);
            window.localStorage.setItem("auth","false");
            dispatch({
              type : actionType.SET_USER,
              user :  null,
            })
            Navigate('/');
          }
        })
      }
    })
  };

  const { scrollY } = UseScrollPosition();
  const heroRef = useRef(null);
  const recitersRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  // Détermine si le header sticky doit être visible
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const showStickyHeader = scrollY > heroHeight * 0.4; // Apparaît quand on a scrollé 80% de la hero section

  // Fonctions de navigation
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const onScrollTo = {
    home: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    reciters: () => scrollToSection(recitersRef),
    about: () => scrollToSection(aboutRef),
    contact: () => scrollToSection(contactRef)
  };
     
  return (
    <div className='w-screen min-h-[150vhd] relative overflow-x-hidden'>

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
       
        className='w-full h-screen relative overflow-hidden'>
       
        {/* Background Image */}
        <img src={bgDikr} alt='background image' className='w-full h-full object-cover absolute inset-0'/>
        

        <FloatingDots />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }} 
          className='absolute top-0 left-0 right-0 flex justify-between items-center p-4 lg:p-6 z-10'>
        
          {/* Logo */}
          <div className='flex items-center'>
            <img src={Logo} alt='Logo' className='w-16 h-16 sm:w-20 sm:h-20 lg:w-25 lg:h-25'/>
          </div>

          {/* Navbar Desktop */}
          <div className='hidden lg:block'>
            <NavbarLandingPage/>
          </div>
          
          {/* Mobile Controls */}
          <div className='flex items-center gap-3 lg:hidden'>
            <div className='p-2 rounded-full hover:bg-orange-100 backdrop-blur-sm cursor-pointer transition-colors'>
              <svg className='w-5 h-5 text-red-400' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z' clipRule='evenodd'/>
              </svg>
            </div>
            
            <button className='bg-gradient-to-br from-[#FF4800] to-[#FFA784] hover:bg-red-500 font-light text-white px-3 py-1.5 rounded-full font-Questria transition-colors duration-200 text-sm'>
              Sign Up
            </button>

            <button className='p-2 rounded-full hover:bg-orange-100 backdrop-blur-sm cursor-pointer transition-colors'>
              <svg className='w-5 h-5 text-red-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
          </div>

          {/* Desktop Controls */}
          <div className='hidden lg:flex items-center gap-8'>
            <div className='p-2 rounded-full hover:bg-orange-100 backdrop-blur-sm cursor-pointer transition-colors'>
              <svg className='w-6 h-6 text-red-400' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z' clipRule='evenodd'/>
              </svg>
            </div>
            <NavLink to={'/SignUp'}>
            <button className='bg-gradient-to-br from-[#FF4800] to-[#FFA784] hover:bg-red-500 font-light text-white px-6 py-2 rounded-full font-Questria transition-colors duration-200'>
              Sign Up
            </button>
            </NavLink>
          </div>
        </motion.div>
        
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }} 
          className='absolute inset-0 flex items-center justify-center lg:justify-start px-4 sm:px-8 lg:pl-16 lg:pr-10 pt-20 sm:pt-24 lg:pt-0'>

          <div className='max-w-2xl text-center lg:text-left'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold font-Kodchasan text-orange-900 mb-4 leading-tight'>
              <Typewriter 
                text="Dikr Playlist" 
                delay={200} 
                infinite 
              />
            </h1>
            

            <h2 className='text-3xl sm:text-4xl lg:text-6xl font-bold font-Kodchasan text-orange-500 mb-6 leading-tight'>
              Beautiful Quran<br/>
              recitations
            </h2>
            
            <p className='text-base sm:text-lg font-Inter font-light text-red-800 mb-4 leading-relaxed'>
              Transform your spiritual routine with curated recitations from renowned Qaris.
              <span className='text-base sm:text-lg text-red-600 ml-2 font-normal mb-8 font-Inter block sm:inline'>
                Start your journey to deeper connection today.
              </span>
            </p>
           
            <button 
              className='bg-gradient-to-r from-[#FF4800] to-[#ff936b] hover:bg-orange-600 mt-2 text-white font-light font-Questria px-6 py-3 sm:px-9 sm:py-2 rounded-full text-base sm:text-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105'
              onClick={signInWithGoogle}>
              Join Us
            </button>
          </div>
          
          <img
  src={Home}
  alt="Home"
  className="
    w-[50vw] sm:w-[25vw] md:w-[30vw] lg:w-[35vw] xl:w-[40vw] 2xl:w-[40vw]
    max-w-none h-auto shadow-lg object-cover border-red-300 shadow-red-500 rounded-md 
    -mt-[8vh] sm:-mt-[10vh] md:-mt-[12vh] lg:-mt-[10vh] xl:-mt-[15vh]
    ml-[15vw] sm:ml-[20vw] md:ml-[25vw] lg:ml-[12vw] xl:-ml-[0vw]
    animate-float 
  "
/>
<img
  src={RecitersOptions}
  alt="Reciters"
  className="
    w-[50vw] sm:w-[20vw] md:w-[25vw] lg:w-[30vw] xl:w-[32vw] 2xl:w-[35vw]
    max-w-none h-auto shadow-lg object-cover border-red-300 shadow-red-500 rounded-md z-10
    mt-[40vh] sm:mt-[40vh] md:mt-[50vh] lg:mt-[20vh] xl:mt-[20vh]
    -ml-[25vw] sm:-ml-[40vw] md:-ml-[30vw] lg:-ml-[20vw] xl:-ml-[25vw]
    animate-float 
  "
/>
        </motion.div>
      </motion.div>
      <div className="relative h-3 -mt-10 z-10">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-400 shadow-lg rounded-t-3xl z-10"></div>
</div>


      {/* Reciters Section */}
      <RecitersSection ref={recitersRef}/>


      
      {/* Shadow Divider Effect */}
<div className="relative h-6 -mt-10 z-10">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-300 shadow-xl rounded-t-3xl z-10"></div>
</div>




      {/* About Us Section */}
      <AboutSection ref={aboutRef}/>

  {/* Shadow Divider Effect */}
<div className="relative h-10 -mt-10 z-10">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-300 shadow-xl rounded-t-3xl z-10"></div>
</div>

   <FooterSection ref={contactRef}/>
    
      
    </div>
    
  )
}
 
export default Login;