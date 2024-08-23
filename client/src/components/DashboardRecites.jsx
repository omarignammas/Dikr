import React, { useEffect, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import { DashboardReciteCard } from "./DashboardReciteCard";
import { motion } from "framer-motion";
import { getAllRecites } from "../api";
import { actionType } from "../context/reducer";
import { useStatevalue } from "../context/StateProvider";
import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const DashboardRecites = () => {
  const [recitefilter, setrecitefilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [filteredReciters, setFilteredReciters] = useState([]);

  const [{ allRecites }, dispatch] = useStatevalue();

  useEffect(() => {
    const fetchRecites = async () => {
      if (!allRecites) {
        const data = await getAllRecites();
        dispatch({
          type: actionType.SET_ALL_RECITES,
          allRecites: data,
        });
      }
    };

    fetchRecites();
  }, [allRecites, dispatch]);

 
  useEffect(() => {
    console.log(filteredReciters);
    if (recitefilter) {
      const filtered = allRecites.Recites.filter(
        // prettier-ignore
        (data) =>  data.name.includes(recitefilter) || data.Reciter.includes(recitefilter) || data.Album.includes(recitefilter)
      );
      setFilteredReciters(filtered);
    }
  }, [recitefilter]);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-4">
      <NavLink
          to={"/dashboard/newRecite"}
          className="flex text-textColor items-center px-4 py-2 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer"
        >
          Add Recite
          <IoAdd />
        </NavLink>
        <input
          type="text"
          placeholder="Search here"
          className={`w-50 px-4 py-2 border ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          } rounded-md bg-transparent outline-none duration-200 transition-all ease-in-out text-base text-textColor font-semibold`}
          value={recitefilter}
          onChange={(e) => setrecitefilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />
        <CiSearch className="text-2xl font-semibold text-textColor cursor-pointer" />
        <motion.i
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.75 }}
          onClick={() => {
            setrecitefilter("");
          }}
        >
          <AiOutlineClear className="text-2xl text-textColor cursor-pointer" onClick={() => setFilteredReciters([]) } />
        </motion.i>
      </div>
      <div className="relative w-full py-12 overflow-x-auto  my-4 flex flex-col items-center justify-start p-4 shadow-xl rounded-md gap-3">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count: {filteredReciters.length || allRecites?.Recites.length}
            </span>
          </p>
        </div>
        {(filteredReciters.length > 0 ? filteredReciters : allRecites?.Recites)?.map((data, i) => (
            <DashboardReciteCard data={data} key={data._id} index={i} />
          ))}

        </div>
      </div>
  );
};

export default DashboardRecites;
