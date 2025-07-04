import React, { useEffect, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import { DashboardPodcastCard } from "./DashboardPodcastCard";
import { motion } from "framer-motion";
import { getAllPodcasts } from "../api";
import { actionType } from "../context/reducer";
import { useStatevalue } from "../context/StateProvider";
import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router-dom";


const DashboardPodcasts = () => {
  const [podcastfilter, setpodcastfilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [filteredPodcaster, setfilteredPodcaster] = useState([]);

  const [{ allPodcasts }, dispatch] = useStatevalue();

  useEffect(() => {
    const fetchpodcasts = async () => {
      if (!allPodcasts) {
        const data = await getAllPodcasts();
        dispatch({
          type: actionType.SET_ALL_PODCASTS,
          allPodcasts: data,
        });
      }
    };

    fetchpodcasts();
  }, [allPodcasts, dispatch]);

 
  useEffect(() => {
    console.log(filteredPodcaster);
    if (podcastfilter) {
      const filtered = allPodcasts.Podcasts.filter(
        // prettier-ignore
        (data) =>  data.name.includes(podcastfilter) || data.Podcaster.includes(podcastfilter) || data.Album.includes(podcastfilter)
      );
      setfilteredPodcaster(filtered);
    }
  }, [podcastfilter]);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-4">
      <NavLink
          to={"/dashboard/newPodcast"}
          className="flex text-textColor items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer"
        >
          Add Podcast {" "}
          <IoAdd />
        </NavLink>
        <input
          type="text"
          placeholder="Search here"
          className={`w-56 px-4 py-3 border ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          } rounded-md bg-transparent outline-none duration-200 transition-all ease-in-out text-base text-textColor font-semibold`}
          value={podcastfilter}
          onChange={(e) => setpodcastfilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />
        <CiSearch className="text-2xl font-semibold text-textColor cursor-pointer" />
        <motion.i
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.75 }}
          onClick={() => {
            setpodcastfilter("");
          }}
        >
          <AiOutlineClear className="text-2xl text-textColor cursor-pointer" onClick={() => setfilteredPodcaster([]) } />
        </motion.i>
      </div>
      <div className="relative w-full py-12 overflow-x-auto  my-4 flex flex-col items-center justify-start p-4 shadow-xl rounded-md gap-3">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-Kodchasan font-semibold text-textColor">
              {filteredPodcaster.length || allPodcasts?.Podcasts.length} Podcast
            </span>
          </p>
        </div>
        {(filteredPodcaster.length > 0 ? filteredPodcaster : allPodcasts?.Podcasts)?.map((data, i) => (
            <DashboardPodcastCard data={data} key={data._id} index={i} />
          ))}

        </div>
      </div>
  );
};

export default DashboardPodcasts;
