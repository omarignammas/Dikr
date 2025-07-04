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
  getAllReciters,
  getAllRecites,
  saveNewAlbum,
  saveNewReciter,
  saveNewRecite,
} from "../api";
import { actionType } from "../context/reducer";
import { filterByLanguage, filters } from "../utils/supportfunctions";
//import { IoMusicalNote } from "react-icons/io5";


 const DashboardNewRecite = () => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [reciteImageUrl, setreciteImageUrl] = useState(null);
  const [setAlert, setSetAlert] = useState(null);
  const [alertMsg, setAlertMsg] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const [reciteName, setreciteName] = useState("");
  const [audioAsset, setAudioAsset] = useState(null);
  const [duration, setDuration] = useState(null);
  const audioRef = useRef();

  const [
    {
      allReciters,
      allAlbums,
      albumFilter,
      reciterFilter,
      filterTerm,
      languageFilter,
    },
    dispatch,
  ] = useStatevalue();

  useEffect(() => {
    if (!allReciters) {
      getAllReciters().then((data) => {
        dispatch({
           type: actionType.SET_ALL_RECITERS,
           allReciters: data 
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

  const deleteImageObject = (ReciteUrl, action) => {
    if (action === "image") {
      setIsImageLoading(true);
      setreciteImageUrl(null);
    } else {
      setIsAudioLoading(true);
      setAudioAsset(null);
    }
    const deleteRef = ref(storage, ReciteUrl);
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

  const saveRecite = () => {
    if (!reciteImageUrl || !audioAsset || !reciteName) {
      setSetAlert("error");
      setAlertMsg("Required fields are missing");
      setTimeout(() => {
        setSetAlert(null);
      }, 4000);
    } else {
      setIsImageLoading(true);
      setIsAudioLoading(true);
      const data = {
        name: reciteName,
        imageURL: reciteImageUrl,
        ReciteURL: audioAsset,
        Album: albumFilter,
        Reciter: reciterFilter,
        Language: languageFilter,
        Category: filterTerm,
      };

      saveNewRecite(data).then((res) => {
        getAllRecites().then((data) => {
          dispatch({
             type: actionType.SET_ALL_RECITES,
             allRecites: data 
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
      setreciteName("");
      setreciteImageUrl(null);
      setAudioAsset(null);
      dispatch({ type: actionType.SET_RECITER_FILTER, reciterFilter: null });
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
            placeholder="Type your recite name"
            className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
            value={reciteName}
            onChange={(e) => setreciteName(e.target.value)}
          />

          <div className="flex w-full justify-between flex-wrap items-center gap-4">
            <FilterButtons filterData={allReciters?.Reciters} flag={"Reciter"} />
            <FilterButtons filterData={allAlbums?.Albums} flag={"Albums"} />
            <FilterButtons filterData={filterByLanguage} flag={"Language"} />
            <FilterButtons filterData={filters} flag={"Category"} />
          </div>

          <div className="flex items-center justify-between gap-2 w-full flex-wrap">
            <div className="bg-card  backdrop-blur-md w-full lg:w-300 h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
              {isImageLoading && <ImageLoader progress={uploadProgress} />}
              {!isImageLoading && (
                <>
                  {!reciteImageUrl ? (
                    <ImageUploader
                      setImageURL={setreciteImageUrl}
                      setAlert={setSetAlert}
                      alertMsg={setAlertMsg}
                      isLoading={setIsImageLoading}
                      setProgress={setUploadProgress}
                      isImage={true}
                    />
                  ) : (
                    <div className="relative w-full h-full overflow-hidden rounded-md">
                      <img
                        src={reciteImageUrl}
                        alt="uploaded image"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                        onClick={() => {
                          deleteImageObject(reciteImageUrl, "image");
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
                  onClick={saveRecite}
                >
                  Send
                </motion.button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full p-4">
          <AddNewReciter />
          <AddNewAlbum />
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




export const AddNewReciter = () => {
  const [isReciter, setIsReciter] = useState(false);
  const [reciterProgress, setreciterProgress] = useState(0);

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [reciterCoverImage, setreciterCoverImage] = useState(null);

  const [reciterName, setreciterName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  const [{ allReciters }, dispatch] = useStatevalue();

  const deleteImageObject = (ReciteUrl) => {
    setIsReciter(true);
    setreciterCoverImage(null);
    const deleteRef = ref(storage, ReciteUrl);
    deleteObject(deleteRef).then(() => {
      setAlert("success");
      setAlertMsg("File removed successfully");
      setTimeout(() => {
        setAlert(null);
      }, 4000);
      setIsReciter(false);
    });
  };

  const saveReciter = () => {
    if (!reciterCoverImage || !reciterName) {
      setAlert("error");
      setAlertMsg("Required fields are missing");
      setTimeout(() => {
        setAlert(null);
      }, 4000);
    } else {
      setIsReciter(true);
      const data = {
        name: reciterName,
        imageURL: reciterCoverImage,
        Twitter: twitter,
        Instagram: instagram,
      };
      saveNewReciter(data).then((res) => {
        getAllReciters().then((reciterData) => {
          dispatch({ 
            type: actionType.SET_ALL_RECITERS,
            allReciters: reciterData.data 
          });
        });
      });
      setIsReciter(false);
      setreciterCoverImage(null);
      setreciterName("");
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
        {isReciter && <ImageLoader progress={reciterProgress} />}
        {!isReciter && (
          <>
            {!reciterCoverImage ? (
              <ImageUploader
                setImageURL={setreciterCoverImage}
                setAlert={setAlert}
                alertMsg={setAlertMsg}
                isLoading={setIsReciter}
                setProgress={setreciterProgress}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={reciterCoverImage}
                  alt="uploaded image"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                  onClick={() => {
                    deleteImageObject(reciterCoverImage);
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
          placeholder="Reciter Name"
          className="w-full lg:w-300 p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
          value={reciterName}
          onChange={(e) => setreciterName(e.target.value)}
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
          {isReciter ? (
            <DisabledButton />
          ) : (
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
              onClick={saveReciter}
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

export const AddNewAlbum = () => {
  const [isAlbum, setIsAlbum] = useState(false);
  const [AlbumProgress, setAlbumProgress] = useState(0);

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [AlbumCoverImage, setAlbumCoverImage] = useState(null);

  const [AlbumName, setAlbumName] = useState("");

  const [{ allAlbums }, dispatch] = useStatevalue();

  const deleteImageObject = (AlbumUrl) => {
    setIsAlbum(true);
    setAlbumCoverImage(null);
    const deleteRef = ref(storage, AlbumUrl);
    deleteObject(deleteRef).then(() => {
      setAlert("success");
      setAlertMsg("File removed successfully");
      setTimeout(() => {
        setAlert(null);
      }, 4000);
      setIsAlbum(false);
    });
  };

  const saveAlbum = () => {
    if (!AlbumCoverImage || !AlbumName) {
      setAlert("error");
      setAlertMsg("Required fields are missing");
      setTimeout(() => {
        setAlert(null);
      }, 4000);
    } else {
      setIsAlbum(true);
      const data = {
        name: AlbumName,
        imageURL: AlbumCoverImage,
      };
      saveNewAlbum(data).then((res) => {
        getAllAlbums().then((albumData) => {
          dispatch({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: albumData.data,
          });
        });
      });
      setIsAlbum(false);
      setAlbumCoverImage(null);
      setAlbumName("");
    }
  };

  return (
    <motion.div
    initial={{ opacity: 0, translateX: -50 }}
    animate={{ opacity: 1, translateX: 0 }}
    transition={{ duration: 0.35, delay: 0.6 }}
    className="flex items-center justify-evenly w-full flex-wrap">
      <div className="bg-card  backdrop-blur-md w-full lg:w-225 h-225 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isAlbum && <ImageLoader progress={AlbumProgress} />}
        {!isAlbum && (
          <>
            {!AlbumCoverImage ? (
              <ImageUploader
                setImageURL={setAlbumCoverImage}
                setAlert={setAlert}
                alertMsg={setAlertMsg}
                isLoading={setIsAlbum}
                setProgress={setAlbumProgress}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={AlbumCoverImage}
                  alt="uploaded image"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                  onClick={() => {
                    deleteImageObject(AlbumCoverImage);
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
          placeholder="Album Name"
          className="w-full lg:w-300 p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
          value={AlbumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />

        <div className="w-full lg:w-300 flex items-center justify-center lg:justify-end">
          {isAlbum ? (
            <DisabledButton />
          ) : (
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
              onClick={saveAlbum}
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


