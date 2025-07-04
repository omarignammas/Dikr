import React from 'react';
import Header from './Header'; 
import { FcHome } from "react-icons/fc"; 
import {NavLink}  from 'react-router-dom'
import {isActiveDashStyle,isNotActiveDash}  from '../utils/styles';
import {DashBoardHome,DashboardUsers,DashboardReciters,DashboardRecites,DashboardAlbums,DashboardNewRecite,DashboardNewPodcasts,DashboardPodcasts, HomePodcasts} from '../components/index';
import {Route,Routes} from 'react-router-dom';
import DashboardNewAlbum from './DashboardNewAlbum';
import DashboardNewReciter from './DashboardNewReciter';
import {Tabs, Tab,TabContext} from "@heroui/tabs";
import { useLocation } from 'react-router-dom';

const Dashboard = () => {

  return (
    <div className='flex flex-col pt-20 md:pt-24 px-4 w-full h-auto items-center justify-center shadow-lg'>
    <Header/>
   
    <div className='w-[60%] my-3 p-2 flex items-center justify-evenly'>
         <NavLink to={"/dashboard/home"} className={({isActive})=> isActive ? isActiveDashStyle : isNotActiveDash}><FcHome className='text-2xl'/></NavLink>
         <NavLink to={"/dashboard/user"} className={({isActive})=> isActive ? isActiveDashStyle : isNotActiveDash}>Users</NavLink>
         <NavLink to={"/dashboard/reciters"} className={({isActive})=> isActive ? isActiveDashStyle : isNotActiveDash}>Reciters</NavLink>
         <NavLink to={"/dashboard/Recites"} className={({isActive})=> isActive ? isActiveDashStyle : isNotActiveDash}>Recites</NavLink>
         <NavLink to={"/dashboard/Podcasts"} className={({isActive})=> isActive ? isActiveDashStyle : isNotActiveDash}>Podcasts</NavLink>
         <NavLink to={"/dashboard/albums"} className={({isActive})=> isActive ? isActiveDashStyle : isNotActiveDash}>Albums</NavLink>
    </div>

    <div className='my-4 w-full p-4' >
      <Routes>
           <Route path='/home' element={<DashBoardHome/>}/>
           <Route path='/user' element={<DashboardUsers/>}/>
           <Route path='/recites' element={<DashboardRecites/>}/>
           <Route path='/newRecite' element={<DashboardNewRecite/>}/>
           <Route path='/Podcasts' element={<DashboardPodcasts/>}/>
           <Route path='/newPodcast' element={<DashboardNewPodcasts/>}/>
           <Route path='/reciters' element={<DashboardReciters/>}/>
           <Route path='/newReciter' element={<DashboardNewReciter/>}/>
           <Route path='/albums' element={<DashboardAlbums/>}/>
           <Route path='/newAlbum' element={<DashboardNewAlbum/>}/>
      </Routes>
    </div>


    </div>
  )
}

export default Dashboard ;