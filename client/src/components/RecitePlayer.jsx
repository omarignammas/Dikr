import React, { useEffect, useState } from "react";
import { useStatevalue } from "../context/StateProvider";
import { IoMdClose } from "react-icons/io";
import { IoArrowRedo } from "react-icons/io5";
import { motion } from "framer-motion";
import { SiGoogleassistant } from "react-icons/si";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { actionType } from "../context/reducer";
import { getAllRecites } from "../api";


const RecitePlayer = () => {
  const [isPlayList, setIsPlayList] = useState(false);
  const [{ allRecites, audio, isAudioPlaying, miniPlayer }, dispatch] = useStatevalue();

  const closeAudioPlayer = () => {
    if (isAudioPlaying) {
      dispatch({
        type: actionType.SET_AUDIO_PLAYING,
        isAudioPlaying: false,
      });
    }
  };

  const togglePlayer = () => {
    if (miniPlayer) {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: false,
      });
    } else {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: true,
      });
    }
  };

  const nextTrack = () => {
    if (audio > allRecites?.Recites.length) {
      dispatch({
        type: actionType.SET_AUDIO,
        audio: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_AUDIO,
        audio: audio + 1,
      });
    }
  };

  const previousTrack = () => {
    if (audio === 0) {
      dispatch({
        type: actionType.SET_AUDIO,
        audio: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_AUDIO,
        audio: audio - 1,
      });
    }
  };

  useEffect(() => {
    if (audio > allRecites?.Recites.length) {
      dispatch({
        type: actionType.SET_AUDIO,
        audio: 0,
      });
    }
  }, [audio]);

  return (
    <div className="w-full full flex items-center gap-3 overflow-hidden">
      <div
        className={`w-full full items-center gap-3 p-4 ${
          miniPlayer ? "absolute top-40" : "flex relative"
        }`}
      >
        <img
          src={allRecites?.Recites[audio]?.imageURL}
          className="w-40 h-20 object-cover rounded-md"
          alt=""
        />
        <div className="flex items-start flex-col">
          <p className="text-xl text-headingColor font-semibold">
            {`${
              allRecites?.Recites[audio]?.name.length > 20
                ? allRecites?.Recites[audio]?.name.slice(0, 20)
                : allRecites?.Recites[audio]?.name
            }`}{" "}
            <span className="text-base">| {allRecites?.Recites[audio]?.Reciter}</span>
          </p>
          <p className="text-textColor">
            {allRecites?.Recites[audio]?.Album}{" "}
          </p>
          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsPlayList(!isPlayList)}
          >
            <SiGoogleassistant className="text-red-400 hover:text-red-300 text-2xl mt-2 cursor-pointer" />
          </motion.i>
        </div>
        <div className="flex-1">
          <AudioPlayer
            src={allRecites?.Recites[audio]?.ReciteURL}
            onPlay={() => console.log("is playing")}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>
        <div className="h-full flex items-center justify-center flex-col gap-3">
          <motion.i whileTap={{ scale: 0.8 }} onClick={closeAudioPlayer}>
            <IoMdClose className="text-gray-400 hover:text-gray-300 text-2xl cursor-pointer" />
          </motion.i>
          <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
            <IoArrowRedo className="text-gray-400 hover:text-gray-300 text-2xl cursor-pointer" />
          </motion.i>
        </div>
      </div>

      {isPlayList && (
        <>
          <PlayListCard />
        </>
      )}

      {miniPlayer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed right-2 bottom-2 "
        >
          <div className="w-40 h-40 rounded-full flex items-center justify-center  relative ">
            <div className="absolute inset-0 rounded-full bg-red-600 blur-xl animate-pulse"></div>
            <img
              onClick={togglePlayer}
              src={allRecites?.Recites[audio]?.imageURL}
              className="z-50 w-32 h-32 rounded-full object-cover cursor-pointer"
              alt=""
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export const PlayListCard = () => {
  const [{ allRecites, audio, isAudioPlaying }, dispatch] = useStatevalue();
  useEffect(() => {
    // console.log(audio);
    if (!allRecites) {
      getAllRecites().then((data) => {
        dispatch({
          type: actionType.SET_ALL_RECITES,
          allRecites: data,
        });
      });
    }
  }, []);

  const setCurrentPlayaudio = (audioindex) => {

    // Dev Mode
    //console.log("Clicked audio index: ", audioindex);
    //console.log("Current audio state before dispatch: ", audio);
    // console.log("Is audio playing: ", isAudioPlaying);

    if (audio !== audioindex) {
      dispatch({
        type: actionType.SET_AUDIO,
        audio: audioindex,
      });
      if (!isAudioPlaying) {
        dispatch({
          type: actionType.SET_AUDIO_PLAYING,
          isAudioPlaying: true,
        });
      }
    } else {
      dispatch({
        type: actionType.SET_AUDIO_PLAYING,
        isAudioPlaying: !isAudioPlaying,
      });
    }

    //console.log("Current audio state after dispatch: ", audio);
  };
  
 

  return (
    <div className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary">
      { 
      allRecites?.Recites.length > 0 ? (
        allRecites?.Recites.map((Audio, audioindex) => (
          <motion.div
            key={audioindex}
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: audioindex * 0.1 }}
            className={`group w-full p-4 hover:bg-red-100 flex gap-3 items-center cursor-pointer ${
              Audio?._id === audio?._id ? "bg-card" : "bg-transparent"
            }`}
            onClick={() => setCurrentPlayaudio(audioindex)}
          >
            <img
                  src={Audio?.imageURL}
                  className=" w-11 min-w-[32px] h-11 rounded-full object-cover"
                  alt=""
                />
            <div className="flex items-start flex-col">
              <p className="text-lg text-headingColor font-semibold">
                {`${
                  Audio?.name.length > 20
                    ? Audio?.name.slice(0, 20)
                    : Audio?.name
                }`}{" "}
                <span className="text-base text-gray-700">| {Audio?.Album}</span>
              </p>
              <p className="text-textColor">
                {Audio?.Reciter}{" "}
                
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default RecitePlayer;
