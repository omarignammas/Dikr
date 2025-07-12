import React, { useEffect } from "react";
import {motion} from "framer-motion"
import { FaUsersLine } from "react-icons/fa6";
import { TbBrandGooglePodcasts } from "react-icons/tb";
import { FaBookOpenReader } from "react-icons/fa6";
import { IoIosAlbums } from "react-icons/io";
import { getAllAlbums, getAllRecites, getAllReciters,getAllUsers } from "../api";
import { actionType } from "../context/reducer";
import { useStatevalue } from "../context/StateProvider";
import StatsSection, { DashboardCard } from "./DashboardCard";

const DashBoardHome = () => {
  const [{ allUsers, allRecites, allReciters, allAlbums }, dispatch] = useStatevalue();

    useEffect(() => {
      const fetchData = async () => {
        if (!allUsers) {
          const data = await getAllUsers();
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data,
          });
        }
    
        if (!allRecites) {
          const data = await getAllRecites();
          dispatch({
            type: actionType.SET_ALL_RECITES,
            allRecites: data,
          });
        }
    
        if (!allReciters) {
          const data = await getAllReciters();
          dispatch({
            type: actionType.SET_ALL_RECITERS,
            allReciters: data,
          });
        }
    
        if (!allAlbums) {
          const data = await getAllAlbums();
          dispatch({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums:  data,
          });
        }
      };

    // for developement mode
    // console.log(allAlbums)
    // console.log(allUsers)
    // console.log(allReciters)
    // console.log(allRecites)

     fetchData();
    }, [allUsers, allRecites, allReciters, allAlbums, dispatch]);
    
  return (
    <motion.div 
  initial={{ opacity: 0, translateX: -50 }}
  animate={{ opacity: 1, translateX: 0 }}
  transition={{ duration: 0.45, delay: 0.56 }}
  className="w-full p-6 flex flex-col md:flex-row flex-wrap items-center justify-evenly gap-6">
  
  {/* Dashboard Card - Users */}
  <DashboardCard icon={<FaUsersLine className="text-3xl text-red-400" />} 
                 name={"Users"} 
                 count={allUsers?.Users.length > 0 ? allUsers?.Users.length : 0} 
                 className="flex-grow"/>
  


  {/* Dashboard Card - Recites */}
  <DashboardCard icon={<TbBrandGooglePodcasts className="text-3xl text-red-400" />} 
                 name={"Recites"} 
                 count={allRecites?.Recites.length > 0 ? allRecites?.Recites.length : 0} 
                 className="flex-grow"/>
  
  

  {/* Dashboard Card - Reciters */}
  <DashboardCard icon={<FaBookOpenReader className="text-3xl text-red-400" />} 
                 name={"Reciters"} 
                 count={allReciters?.Reciters.length > 0 ? allReciters?.Reciters.length : 0} 
                 className="flex-grow"/>
  


  {/* Dashboard Card - Albums */}
  <DashboardCard icon={<IoIosAlbums className="text-3xl text-red-400" />} 
                 name={"Albums"} 
                 count={allAlbums?.Albums.length > 0 ? allAlbums?.Albums.length : 0} 
                 className="flex-grow"/>
 
</motion.div>

  );
};
export default DashBoardHome;
