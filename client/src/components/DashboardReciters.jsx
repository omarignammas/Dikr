import React, { useEffect, useState } from "react";
import {ReciterCard} from "../components/index";
import { useStatevalue } from "../context/StateProvider";
import { AiOutlineClear } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import { motion } from "framer-motion";
import { actionType } from "../context/reducer";
import { getAllReciters } from "../api";
import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router-dom";


const DashboardReciters = () => {
  const [reciterfilter, setreciterfilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [filteredReciters, setFilteredReciters] = useState([]);
  const [{ allReciters }, dispatch] = useStatevalue();

  useEffect(() => {
    // console.log(allReciters)
    if (!allReciters) {
      getAllReciters().then((data) => {
        dispatch({
          type: actionType.SET_ALL_RECITERS,
          allReciters: data 
        });
      });
    }
  }, [allReciters,dispatch]);

  
  useEffect(() => {
    // console.log(filteredReciters);
    if (reciterfilter) {
      const filtered = allReciters.Reciters.filter(
        // prettier-ignore
        (data) =>  data.name.includes(reciterfilter) 
      );
      setFilteredReciters(filtered);
    }
  }, [reciterfilter]);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-4">
      <NavLink
          to={"/dashboard/newReciter"}
          className="flex text-textColor items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer"
        >
          Add Reciter {" "}
          <IoAdd />
        </NavLink>
        <input
          type="text"
          placeholder="Search here"
          className={` w-56 px-4 py-3 border ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          } rounded-md bg-transparent outline-none duration-200 transition-all ease-in-out text-base text-textColor font-semibold`}
          value={reciterfilter}
          onChange={(e) => setreciterfilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />
        <CiSearch className="text-2xl font-semibold text-textColor cursor-pointer" />
        <motion.i
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.75 }}
          onClick={() => {
            setreciterfilter("");
          }}
        >
          <AiOutlineClear className="text-2xl text-textColor cursor-pointer" onClick={() => setFilteredReciters([]) } />
        </motion.i>
      </div>
      <div className="relative w-full py-12 overflow-x-auto  my-4 flex flex-wrap items-center justify-start p-4 shadow-xl rounded-md gap-3">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-Kodchasan font-semibold text-gray-500">
              {filteredReciters.length || allReciters?.Reciters.length} Reciter
            </span>
          </p>
        </div>
        {(filteredReciters.length > 0 ? filteredReciters : allReciters?.Reciters)?.map((data, i) => (
            <ReciterCard data={data} key={data._id} index={i} />
          ))}

        </div>
      </div>
  );
};



export default DashboardReciters;
