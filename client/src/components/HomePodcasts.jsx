import React, { useEffect, useState } from "react";
import { getAllPodcasts } from "../api";
import { actionType } from "../context/reducer";
import { useStatevalue } from "../context/StateProvider";
import Filter from "./Filter";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

const HomePodcasts = () => {
  const [
    {
      searchTerm,
      isAudioPlaying,
      audio,
      allPodcasts,
      PodcasterFilter,
      filterTerm,
      albumFilter,
      languageFilter,
    },
    dispatch,
  ] = useStatevalue();

  const [filteredaudios, setFilteredaudios] = useState({});

  useEffect(() => {
    const fetchPodcast = async () => {
      if (!allPodcasts) {
        const data = await getAllPodcasts();
        dispatch({
          type: actionType.SET_ALL_PODCASTS,
          allPodcasts: data,
        });
      }
    };

    fetchPodcast();
    //console.log(allPodcasts);
  }, [allPodcasts, dispatch]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = allPodcasts?.Podcasts.filter(
        (data) =>
          data.Podcaster.toLowerCase().includes(searchTerm) ||
          data.Language.toLowerCase().includes(searchTerm) ||
          data.name.toLowerCase().includes(searchTerm) ||
          data.Podcaster.includes(PodcasterFilter)
      );
      setFilteredaudios(filtered);
    } else {
      setFilteredaudios(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    const filtered = allPodcasts?.Podcasts.filter((data) => data.Podcaster === PodcasterFilter);
    if (filtered) {
      setFilteredaudios(filtered);
    } else {
      setFilteredaudios(null);
    }
  }, [PodcasterFilter]);

  useEffect(() => {
    const filtered = allPodcasts?.Podcasts.filter(
      (data) => data.Category.toLowerCase() === filterTerm
    );
    if (filtered) {
      setFilteredaudios(filtered);
    } else {
      setFilteredaudios(null);
    }
  }, [filterTerm]);

  useEffect(() => {
    const filtered = allPodcasts?.Podcasts.filter((data) => data.Album === albumFilter);
    if (filtered) {     
      setFilteredaudios(filtered);
      //console.log(filteredaudios);
    } else {
      setFilteredaudios(null);
    }
  }, [albumFilter]);

  useEffect(() => {

    const filtered = allPodcasts?.Podcasts.filter(
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
         <HomeaudioContainer audios={filteredaudios?.length > 0 ? filteredaudios : (allPodcasts?.Podcasts)} />
      </div>
    </div>
  );
};

export const HomeaudioContainer = ({ audios }) => {
  // console.log("audios name's  :", audios?.map((data, index) => data.name));
  const [{ isAudioPlaying, audio }, dispatch] = useStatevalue();

  const addaudioToContext = (podcastData) => {
    if (!isAudioPlaying) {
      dispatch({
        type: actionType.SET_AUDIO_PLAYING,
        isAudioPlaying: true,
      });
    }
    if (audio !==  podcastData) {  // Utiliser l'ID du podcast pour vérifier
      dispatch({
        type: actionType.SET_AUDIO,
        audio: podcastData,  // Associez directement les données du podcast sélectionné
      });
    }
  };
  


  // Check for null or undefined audios and handle accordingly
  if (!audios) {
    return <p className="text-xl font-semibold text-red-400">No Podcasts available</p>; 
  }else{

    return (
      <>
    {audios?.map((data, index) => (
    <motion.div
      key={data._id } // Use _id as a fallback is unique
      whileTap={{ scale: 0.8 }}
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative w-80 min-w-210 px-4 py-5 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
      onClick={() => addaudioToContext(index)}
    >
      <div className="w-75 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageURL}
          alt=""
          className="w-full h-full rounded-lg object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
  
      <p className="text-base flex flex-col justify-center items-center text-headingColor font-semibold my-2">
        {data.name.length > 25 ? `${data.name.slice(0, 45)}` : data.name}
        <span className="block text-sm text-gray-400 my-1">
          {data.Podcaster}
        </span>
      </p>
    </motion.div>
  ))}
  
  
      </>
      
    );

  }
  
  
};

  


export default HomePodcasts;

