import React, { useEffect, useState } from "react";
import { getAllRecites } from "../api";
import { actionType } from "../context/reducer";
import { useStatevalue } from "../context/StateProvider";
import Filter from "./Filter";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

const Home = () => {
  const [
    {
      searchTerm,
      isAudioPlaying,
      audio,
      allRecites,
      reciterFilter,
      filterTerm,
      albumFilter,
      languageFilter,
    },
    dispatch,
  ] = useStatevalue();

  const [filteredaudios, setFilteredaudios] = useState({});

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
    if (searchTerm.length > 0) {
      const filtered = allRecites?.Recites.filter(
        (data) =>
          data.Reciter.toLowerCase().includes(searchTerm) ||
          data.Language.toLowerCase().includes(searchTerm) ||
          data.name.toLowerCase().includes(searchTerm) ||
          data.Reciter.includes(reciterFilter)
      );
      setFilteredaudios(filtered);
    } else {
      setFilteredaudios(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    const filtered = allRecites?.Recites.filter((data) => data.Reciter === reciterFilter);
    if (filtered) {
      setFilteredaudios(filtered);
    } else {
      setFilteredaudios(null);
    }
  }, [reciterFilter]);

  useEffect(() => {
    const filtered = allRecites?.Recites.filter(
      (data) => data.Category.toLowerCase() === filterTerm
    );
    if (filtered) {
      setFilteredaudios(filtered);
    } else {
      setFilteredaudios(null);
    }
  }, [filterTerm]);

  useEffect(() => {
    const filtered = allRecites?.Recites.filter((data) => data.Album === albumFilter);
    if (filtered) {     
      setFilteredaudios(filtered);
      //console.log(filteredaudios);
    } else {
      setFilteredaudios(null);
    }
  }, [albumFilter]);

  useEffect(() => {

    const filtered = allRecites?.Recites.filter(
      (data) => data.Language === languageFilter
    );
    if (filtered) {
      setFilteredaudios(filtered);
    } else {
      setFilteredaudios(null);
    }

  }, [languageFilter]);

  useEffect(() => {
  // console.log("Filteredaudios updated:", filteredaudios);
  }, [filteredaudios]);

  return (
    <div className="w-full h-full flex flex-col items-center pt-20 md:pt-24 px-4 justify-center bg-primary">
       <Header  />
      <SearchBar />

      {searchTerm.length > 0 && (
        <p className="my-4 text-base text-textColor">
          Searched for :
          <span className="text-xl text-cartBg font-semibold">
            {searchTerm}
          </span>
        </p>
      )}

      <Filter setFilteredaudios={setFilteredaudios} />

      <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4">
         <HomeaudioContainer audios={filteredaudios?.length > 0 ? filteredaudios : (allRecites?.Recites || [])} />
     </div>
     </div>


  );

};

export const HomeaudioContainer = ({ audios }) => {

  const [{ isAudioPlaying, audio }, dispatch] = useStatevalue();

  const addaudioToContext = (index) => {
    if (!isAudioPlaying) {
      dispatch({
        type: actionType.SET_AUDIO_PLAYING,
        isAudioPlaying: true,
      });
    }
    if (audio !== index) {
      dispatch({
        type: actionType.SET_AUDIO,
        audio: index,
      });
    }
  };

  // Check for null or undefined audios and handle accordingly
  if (!audios) {
    return <p className="text-xl font-semibold text-red-400">No Recite available</p>; 
  }


  
  return (
    <>
  {audios?.map((data, index) => (
  <motion.div
    key={data._id } // Use _id as a fallback is unique
    whileTap={{ scale: 0.8 }}
    initial={{ opacity: 0, translateX: -50 }}
    animate={{ opacity: 1, translateX: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="relative w-40 min-w-210 px-4 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center "
    onClick={() => addaudioToContext(index)}
  >
    <div className=" w-48 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
      <motion.img
        whileHover={{ scale: 1.05 }}
        src={data.imageURL}
        alt=""
        className=" w-full h-full rounded-lg object-cover"
      />
    </div>

    <p className="text-base flex flex-col justify-center items-center text-headingColor font-semibold my-2">
      {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
      <span className="block text-sm text-gray-400 my-1">
        {data.Reciter}
      </span>
    </p>
  </motion.div>
))}

    </>
  );
};

export default Home;

