import React, { useEffect, useRef, useState } from "react";
import {DisabledButton,FilterButtons,ImageLoader,ImageUploader,AlertSuccess,AlertError} from "../components/index";
import {
  ref,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";
//import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { storage } from "../config/firebase.config";
import { useStatevalue } from "../context/StateProvider";
import {
  getAllAlbums,
  getAllPodcasters,
  getAllPodcasts,
  saveNewAlbum,
  saveNewPodcaster,
  saveNewPodcast,
} from "../api";
import { actionType } from "../context/reducer";
import { filterByLanguage, filters } from "../utils/supportfunctions";
//import { IoMusicalNote } from "react-icons/io5";


 const DashboardNewRecite = () => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [podcastImageURL, setpodcastImageURL] = useState(null);
  const [setAlert, setSetAlert] = useState(null);
  const [alertMsg, setAlertMsg] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const [podcastName, setpodcastName] = useState("");
  const [audioAsset, setAudioAsset] = useState(null);
  const [duration, setDuration] = useState(null);
  const audioRef = useRef();

  const [
    { 
      allPodcasters,
      allAlbums,
      albumFilter,
      podcasterFilter,
      filterTerm,
      languageFilter,
    },
    dispatch,
  ] = useStatevalue();

  useEffect(() => {
    if (!allPodcasters) {
      getAllPodcasters().then((data) => {
        dispatch({
           type: actionType.SET_ALL_PODCASTERS,
           allPodcasters: data 
          });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ 
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data 
        });
      });
    }
  }, []);

  const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMin} : ${returnSec}`;
  };

  const deleteImageObject = (PodcastURL, action) => {
    if (action === "image") {
      setIsImageLoading(true);
      setpodcastImageURL(null);
    } else {
      setIsAudioLoading(true);
      setAudioAsset(null);
    }
    const deleteRef = ref(storage, PodcastURL);
    deleteObject(deleteRef).then(() => {
      setSetAlert("success");
      setAlertMsg("File removed successfully");
      setTimeout(() => {
        setSetAlert(null);
      }, 4000);
      setIsImageLoading(false);
      setIsAudioLoading(false);
    });
  };

  const savePodcast = () => {
    if (!podcastImageURL || !audioAsset || !podcastName) {
      setSetAlert("error");
      setAlertMsg("Required fields are missing");
      setTimeout(() => {
        setSetAlert(null);
      }, 4000);
    } else {
      setIsImageLoading(true);
      setIsAudioLoading(true);
      const data = {
        name: podcastName,
        imageURL: podcastImageURL,
        PodcastURL: audioAsset,
        Album: albumFilter,
        Podcaster: podcasterFilter,
        Language: languageFilter,
        Category: filterTerm,
      };

      saveNewPodcast(data).then((res) => {
        getAllPodcasts().then((data) => {
          console.log("save data :",data )
          dispatch({
             type: actionType.SET_ALL_PODCASTS,
             allPodcasts: data
            });
        });
      });
      setSetAlert("success");
      setAlertMsg("Data saved successfully");
      setTimeout(() => {
        setSetAlert(null);
      }, 4000);
      setIsImageLoading(false);
      setIsAudioLoading(false);
      setpodcastName("");
      setpodcastImageURL(null);
      setAudioAsset(null);
      dispatch({ type: actionType.SET_PODCASTER_FILTER, podcasterFilter: null });
      dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
      setDuration(null);
    }
  };

  return (
    <motion.div 
    initial={{ opacity: 0, translateX: -50 }}
    animate={{ opacity: 1, translateX: 0 }}
    transition={{ duration: 0.35, delay: 0.6 }}
    className="flex items-center justify-center p-4 border border-gray-300 rounded-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Type your Podcast name"
            className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
            value={podcastName}
            onChange={(e) => setpodcastName(e.target.value)}
          />

          <div className="flex w-full justify-between flex-wrap items-center gap-4">
            <FilterButtons filterData={allPodcasters?.Podcasters} flag={"Podcaster"} />
            <FilterButtons filterData={allAlbums?.Albums} flag={"Albums"} />
            <FilterButtons filterData={filterByLanguage} flag={"Language"} />
            <FilterButtons filterData={filters} flag={"Category"} />
          </div>

          <div className="flex items-center justify-between gap-2 w-full flex-wrap">
            <div className="bg-card  backdrop-blur-md w-full lg:w-300 h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
              {isImageLoading && <ImageLoader progress={uploadProgress} />}
              {!isImageLoading && (
                <>
                  {!podcastImageURL ? (
                    <ImageUploader
                      setImageURL={setpodcastImageURL}
                      setAlert={setSetAlert}
                      alertMsg={setAlertMsg}
                      isLoading={setIsImageLoading}
                      setProgress={setUploadProgress}
                      isImage={true}
                    />
                  ) : (
                    <div className="relative w-full h-full overflow-hidden rounded-md">
                      <img
                        src={podcastImageURL}
                        alt="uploaded image"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                        onClick={() => {
                          deleteImageObject(podcastImageURL, "image");
                        }}
                      >
                        <MdDelete className="text-white" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="bg-card  backdrop-blur-md w-full lg:w-300 h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
              {isAudioLoading && <ImageLoader progress={uploadProgress} />}
              {!isAudioLoading && (
                <>
                  {!audioAsset ? (
                    <ImageUploader
                      setImageURL={setAudioAsset}
                      setAlert={setSetAlert}
                      alertMsg={setAlertMsg}
                      isLoading={setIsAudioLoading}
                      setProgress={setUploadProgress}
                      isImage={false}
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md">
                      <audio ref={audioRef} src={audioAsset} controls />
                      <button
                        type="button"
                        className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                        onClick={() => {
                          deleteImageObject(audioAsset, "audio");
                        }}
                      >
                        <MdDelete className="text-white" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center justify-end w-full p-4">
              {isImageLoading || isAudioLoading ? (
                <DisabledButton />
              ) : (
                <motion.button
                  whileTap={{ scale: 0.75 }}
                  className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
                  onClick={savePodcast}
                >
                  Send
                </motion.button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full p-4">
          <AddNewPodcaster />
  
        </div>
      </div>
      {setAlert && (
        <>
          {setAlert === "success" ? (
            <AlertSuccess msg={alertMsg} />
          ) : (
            <AlertError msg={alertMsg} />
          )}
        </>
      )}
    </motion.div>
  );
};

export default DashboardNewRecite;




export const AddNewPodcaster = () => {
  const [isPodcaster, setIsPodcaster] = useState(false);
  const [PodcasterProgress, setPodcasterProgress] = useState(0);

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [PodcasterCoverImage, setPodcasterCoverImage] = useState(null);

  const [PodcasterName, setPodcasterName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  const [{ allPodcasters }, dispatch] = useStatevalue();

  const deleteImageObject = (PodcastURL) => {
    setIsPodcaster(true);
    setPodcasterCoverImage(null);
    const deleteRef = ref(storage, PodcastURL);
    deleteObject(deleteRef).then(() => {
      setAlert("success");
      setAlertMsg("File removed successfully");
      setTimeout(() => {
        setAlert(null);
      }, 4000);
      setIsPodcaster(false);
    });
  };

  const savePodcaster = () => {
    if (!PodcasterCoverImage || !PodcasterName) {
      setAlert("error");
      setAlertMsg("Required fields are missing");
      setTimeout(() => {
        setAlert(null);
      }, 4000);
    } else {
      setIsPodcaster(true);
      const data = {
        name: PodcasterName,
        imageURL: PodcasterCoverImage,
        Twitter: twitter,
        Instagram: instagram,
      };
      saveNewPodcaster(data).then((res) => {
        getAllPodcasters().then((PodcasterData) => {
          dispatch({ 
            type: actionType.SET_ALL_PODCASTERS,
            allPodcasters: PodcasterData.data 
          });
        });
      });
      setIsPodcaster(false);
      setPodcasterCoverImage(null);
      setPodcasterName("");
      setTwitter("");
      setInstagram("");
    }
  };

  return (
    <motion.div 
    initial={{ opacity: 0, translateX: -50 }}
    animate={{ opacity: 1, translateX: 0 }}
    transition={{ duration: 0.35, delay: 0.6 }}
    className="flex items-center justify-evenly w-full flex-wrap">
      <div className="bg-card  backdrop-blur-md w-full lg:w-225 h-225 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isPodcaster && <ImageLoader progress={PodcasterProgress} />}
        {!isPodcaster && (
          <>
            {!PodcasterCoverImage ? (
              <ImageUploader
                setImageURL={setPodcasterCoverImage}
                setAlert={setAlert}
                alertMsg={setAlertMsg}
                isLoading={setIsPodcaster}
                setProgress={setPodcasterProgress}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={PodcasterCoverImage}
                  alt="uploaded image"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                  onClick={() => {
                    deleteImageObject(PodcasterCoverImage);
                  }}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-4 ">
        <input
          type="text"
          placeholder="Podcaster Name"
          className="w-full lg:w-300 p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
          value={PodcasterName}
          onChange={(e) => setPodcasterName(e.target.value)}
        />

        <div className="w-full lg:w-300 p-3 flex items-center rounded-md  shadow-sm border border-gray-300">
          <p className="text-base font-semibold text-gray-400">
            www.twitter.com/
          </p>
          <input
            type="text"
            placeholder="your id"
            className="w-full text-base font-semibold text-textColor outline-none bg-transparent"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </div>

        <div className="w-full lg:w-300 p-3 flex items-center rounded-md  shadow-sm border border-gray-300">
          <p className="text-base font-semibold text-gray-400">
            www.instagram.com/
          </p>
          <input
            type="text"
            placeholder="your id"
            className="w-full text-base font-semibold text-textColor outline-none bg-transparent"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </div>

        <div className="w-full lg:w-300 flex items-center justify-center lg:justify-end">
          {isPodcaster ? (
            <DisabledButton />
          ) : (
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
              onClick={savePodcaster}
            >
              Send
            </motion.button>
          )}
        </div>
      </div>

      {alert && (
        <>
          {alert === "success" ? (
            <AlertSuccess msg={alertMsg} />
          ) : (
            <AlertError msg={alertMsg} />
          )}
        </>
      )}
    </motion.div>
  );
};


  


