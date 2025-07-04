import React,{useState} from 'react';
import {Logo} from '../assets/img/index';
import { NavLink, useNavigate } from 'react-router-dom';
import {isActiveStyle,isNotActive}  from '../utils/styles';
import { FcApproval } from "react-icons/fc";
import {useStatevalue} from '../context/StateProvider';
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase.config';
import {motion} from 'framer-motion';
import { CiLogout } from "react-icons/ci";
import { GrFavorite } from "react-icons/gr";
import { TbLayoutDashboard } from "react-icons/tb";



const Header = () => {

    const [{user},dispatch] = useStatevalue();
    const [isMenu, SetisMenu] = useState(false);
    const navigate = useNavigate();


    const navLinks = [
        { title: 'Home', url: '/' },
        { title: 'Recites', url: '/Recites' },
        { title: 'About', url: "/About"},
        { title: 'Contact', url: '/contact' }
    ];

    const logOut = () => {
        const firebaseAuth = getAuth(app);
        firebaseAuth.signOut().then(()=> {
          window.localStorage.setItem('auth','false');
        }).catch((e)=> {console.log(e)});
        navigate('/login',{replace : true});
    };
    

  return (
    <header className="flex items-center p-4 h-80 w-full md:py-2 md:px-6 font-Euclid shadow-lg fixed top-0 left-0 right-0 z-50 bg-white">
    <NavLink to={"/"}>
        <img src={Logo} alt='Logo' className='w-140 w-min-[130px] md:w-150 sm:w-150'/>
    </NavLink>

    <ul className="ml-10 flex gap-4 md:gap-16 items-center justify-center text-center cursor-pointer">
        {navLinks.map((link, index) => (<NavLink key={index} to={link.url} className={({isActive})=> isActive ? isActiveStyle : isNotActive}> <li key={index} >{link.title}</li> </NavLink>))}
    </ul>

    <div 
      onMouseEnter={()=> {SetisMenu(true)}}
      onMouseLeave={()=> {SetisMenu(false)}}
    className='flex ml-auto items-center justify-end relative cursor-pointer gap-2 px-1 w-full'>
       <img src={user?.user.imageURL} alt='profile' className='h-10 min-w-[40px] w-10 rounded-full border-2 object-cover border-red-500 shadow-lg' referrerPolicy="no-referrer"/>

      <div className='flex flex-col'>
         <p className=' text-sm text-textColor font-semibold  hover:text-headingColor'>{user?.user.name}</p>
         <p className='flex text-xs text-gray-400 items-center gap-1 font- font-Euclid'>Verified Member <FcApproval/></p>

      </div>
       {isMenu && 
        (<motion.div 
        initial = {{opacity : 0 ,y : 50}}
        animate = {{opacity : 1 ,y : 0}}
        exit = {{opacity : 0 ,y : 50}}
       className='bg-card w-275 h-260 absolute right-0 flex flex-col backdrop-blur-sm top-10 z-10 shadow-lg rounded-lg gap-2'>
       <img src={user?.user.imageURL} alt='profile' className='h-10 min-w-[40px] w-10 rounded-full border-2 object-cover shadow-lg ml-28 mt-5' referrerPolicy="no-referrer" />
         <p className='text-xs text-gray-400 gap-0 font-Euclid font-semibold text-center underline'>{user?.user.email}</p>
         <NavLink to={'/userprofile'}>
            <button className='text-xs text-gray-500 gap-0 font-Euclid  hover:text-textColor hover:underline text-center ml-16' >Manage Your Dikr Account</button>
         </NavLink>

         <hr/>
         
         {user?.user.role === 'Admin' &&
         (
          <NavLink to={'/Dashboard/home'}>
            <button className='menu text-xs text-gray-500 font-Euclid font-semibold mt-1 hover:text-textColor text-center ml-20 flex justify-center items-center gap-2 '><TbLayoutDashboard /> Dashboard</button>
         </NavLink>
         )
        } 
        
         <hr/>

         <NavLink to={'/Myfavourites'}>
            <button className='menu text-xs text-gray-500 font-Euclid font-semibold mt-1 hover:text-textColor text-center ml-20 flex justify-center items-center gap-2'><GrFavorite /> My Favourites</button>
         </NavLink>

         <hr/>

            <button className='menu text-xs text-gray-500  font-Euclid font-semibold hover:text-textColor text-center mt-3 ml-24 flex items-center gap-2' onClick={logOut}><CiLogout /> Log out</button>
       
       </motion.div>
       )}
      </div>
    
    </header>
  );
};

export default Header;



