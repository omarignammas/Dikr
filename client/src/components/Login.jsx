import React from 'react';
import {app} from '../config/firebase.config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {useStatevalue} from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { ValidateUser } from '../api';
import {bg2} from '../assets/img/index'
import {Logo} from '../assets/img/index'
import Typewriter from './Typewriter';
import {motion} from 'framer-motion';



const Login = ({Setauth}) => {

  //authentication using google account
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const Navigate = useNavigate();
  const [{user},dispatch] = useStatevalue();


  //if the user already sign in ,passed to the Home page dirctly
  useEffect(() => {
    if(window.localStorage.getItem("auth") === "true"){
      Navigate("/",{replace:true});
    }else{
      Navigate("/login");
    }   
  }, [])
    
   //Sign up using google Account
    const signInWithGoogle = async () => {
       await signInWithPopup(auth, provider).then((userCred) => {
          //console.log(userCred);
          if(userCred){
           //Setauth(true);
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
              Navigate('/',{replace :'true'});
            }
            else{
              Setauth(false);
              window.localStorage.setItem("auth","false");
              dispatch({
                type : actionType.SET_USER,
                user :  null,
              })
              
              Navigate('/login');
            }

          })
        }

        })
    };
     
  return (
    <div className= 'w-screen h-screen relative'>
            <img src={bg2} alt='background image' className='w-full h-full contain-content object-fill blur-sm'/>
        <motion.div 
          initial = {{opacity : 0.5 ,y : 30}}
          animate = {{opacity : 1 ,y : 0}}
          exit = {{opacity : 0.5 ,y : 30}}
        className='absolute inset-0 flex flex-col items-center justify-center p-4 gap-4'>
        <div className='flex gap-20 text-red-600'>
         
             <NavLink>
                   <p className='flex gap-20 font-semibold font-serif hover:text-red-300 hover:underline'>Home</p>
             </NavLink>
             <NavLink>
                   <p className='flex gap-20 font-semibold font-serif hover:text-red-300 hover:underline'>About</p>
             </NavLink>
             <NavLink>
                   <p className='flex gap-20 font-semibold font-serif hover:text-red-300 hover:underline ease-in-out'>Contact</p>
             </NavLink>

        </div>
             
             
             <img src={Logo} alt='Logo' className='w-25 h-25 mb-0 '></img>
             <p className='text-center font-serif text-2xl font-bold space-x-2 text-red-400'>﴾أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ﴿</p>
             <p className='text-center font-serif text-3xl font-bold space-x-3'>Empowering your spiritual journey,one recitation at a time.<br/>Our Dikr app promises to deliver a seamless and enriching experience,<br/>  offering you the tools to grow in  <span className=' text-red-500'>faith</span>, <span className=' text-red-500'>knowledge</span>, and <span className=' text-red-500'>mindfulness</span>.</p>
             <p className='text-center font-serif text-2xl font-bold space-x-2 text-red-400'><Typewriter text="Connect with iman, find peace, and stay inspired every day " delay={70} infinite /></p>
             <div className='flex justify-center text-white font-serif items-center rounded-md  gap-2 bg-red-500 px-3 py-2 cursor-pointer hover:bg-red-400 hover:shadow-lg duration-75 ease-in shadow-sm' onClick={signInWithGoogle}>
               Sign in Now
             </div>
        </motion.div>
    </div>
  )
}
 
export default Login ;

