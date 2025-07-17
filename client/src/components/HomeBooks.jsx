import React, { useEffect, useState } from "react";
import { getAllPodcasts } from "../api";
import { actionType } from "../context/reducer";
import { useStatevalue } from "../context/StateProvider";
import Filter from "./Filter";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import { FaDev } from "react-icons/fa";

const HomeBooks = () => {
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
    return <p className="text-xl font-semibold text-red-400">No Recite available</p>; 
  }else{

    return (
      <>
   
  
   <div className=" text-center ml-[45%] text-2xl w-screen h-screen flex"> <FaDev></FaDev>  <h1>In Dev Mode</h1></div>
      </>
      
    );

  }
  
  
};

  


export default HomeBooks ;

