import React, { useEffect, useState } from "react";
import {AlbumCard} from "../components/index";
import { useStatevalue } from "../context/StateProvider";
import { AiOutlineClear } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import { motion } from "framer-motion";
import { actionType } from "../context/reducer";
import { getAllAlbums } from "../api";
import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router-dom";



const DashboardAlbums = () => {
  const [albumfilter, setalbumfilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [{ allAlbums }, dispatch] = useStatevalue();

  useEffect(() => {
    // console.log(allAlbums)
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data 
        });
      });
    }
  }, [allAlbums,dispatch]);

    
  useEffect(() => {
    // console.log(filteredReciters);
    if (albumfilter) {
      const filtered = allAlbums.Albums.filter(
        // prettier-ignore
        (data) =>  data.name.includes(albumfilter) 
      );
      setFilteredAlbums(filtered);
    }
  }, [albumfilter]);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-4">
      <NavLink
          to={"/dashboard/newAlbum"}
          className="flex text-textColor items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer"
        >
          Add Albumn
          <IoAdd />
        </NavLink>
        <input
          type="text"
          placeholder="Search here"
          className={`w-56 px-4 py-3 border ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          } rounded-md bg-transparent outline-none duration-200 transition-all ease-in-out text-base text-textColor font-semibold`}
          value={albumfilter}
          onChange={(e) => setalbumfilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />
        <CiSearch className="text-2xl font-semibold text-textColor cursor-pointer" />
        <motion.i
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.75 }}
          onClick={() => {
            setalbumfilter("");
          }}
        >
          <AiOutlineClear className="text-2xl text-textColor cursor-pointer" onClick={() => setFilteredAlbums([]) } />
        </motion.i>
      </div>
      <div className="relative w-full py-12 overflow-x-auto my-4 flex flex-wrap items-center justify-start p-4 shadow-xl rounded-md gap-3">
        <div className="absolute top-4 left-4">
          <p className="text-md font-Kodchasan ">
            {filteredAlbums.length || allAlbums?.Albums.length} Albums
          </p>
        </div>
        {(filteredAlbums.length > 0 ? filteredAlbums : allAlbums?.Albums)?.map((data, i) => (
            <AlbumCard data={data} key={data._id} index={i} />
          ))}

        </div>
      </div>
  );
};



export default DashboardAlbums;
