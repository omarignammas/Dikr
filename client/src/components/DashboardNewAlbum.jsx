import React, { useState } from "react";
import {DisabledButton,ImageLoader,ImageUploader,AlertSuccess,AlertError, DashboardAlbums} from "../components/index";
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
  saveNewAlbum,
} from "../api";
import { actionType } from "../context/reducer";
//import { IoMusicalNote } from "react-icons/io5";


const DashboardNewAlbum = () => {
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
    className="flex items-center justify-evenly w-full flex-wrap gap-5">
      <div className="bg-card  backdrop-blur-md w-full lg:w-300 h-225 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
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

      <div className="border-t-2 w-full h-0 lg:border-l-2 lg:border-t-0 lg:h-32 lg:w-0 border-red-300 mx-4 transition-all duration-300"></div>

      <div className="flex flex-col mr-4 items-center justify-center gap-4 ">
        <input
          type="text"
          placeholder="Album Name"
          className="w-full  lg:w-300 p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
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

export default DashboardNewAlbum ;
