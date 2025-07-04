import React from 'react';
import {motion} from "framer-motion";
import {Header} from "../components/index";
import { useEffect,useState } from "react";
import {DisabledButton,ImageLoader,AlertSuccess,AlertError} from "../components/index";
import {
  ref,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useStatevalue } from "../context/StateProvider";
import {
  getAllAlbums,
  getAllReciters,
  saveNewReciter,
} from "../api";
import { actionType } from "../context/reducer";
import { Dikr } from '../assets/img';




const Contact = () => {

  const [isReciter, setIsReciter] = useState(false);
  const [reciterProgress, setreciterProgress] = useState(0);

  const [alert, setAlert] = useState(false);
  const [reciterCoverImage, setreciterCoverImage] = useState(null);

  const [reciterName, setreciterName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  const [alertMsg, setAlertMsg] = useState("");

  const [{allReciters,allAlbums},dispatch] = useStatevalue();

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
    transition={{ duration: 0.30, delay: 0.6 }}
    className="w-full h-auto flex flex-col pt-20 md:pt-24 px-4  items-center justify-center gap-6 bg-white"
  >
    <Header />

    <div className="text-2xl text-red-500 italic font-semibold">CONTACT US</div>

    <div className="relative w-full py-12 overflow-x-auto  my-4 flex flex-col items-center justify-start p-4 shadow-xl rounded-md gap-3">
    <motion.div 
    initial={{ opacity: 0, translateX: -50 }}
    animate={{ opacity: 1, translateX: 0 }}
    transition={{ duration: 0.35, delay: 0.6 }}
    className="w-full p-5  flex items-center justify-center flex-col">
    <div className="flex items-center justify-evenly w-full flex-wrap gap-5">
      <div className="bg-card  backdrop-blur-md w-full lg:w-340 h-225 ml-10 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isReciter && <ImageLoader progress={reciterProgress} />}
       
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={Dikr}
                  alt="uploaded image"
                  className="w-full h-full object-cover"
                />
                
              </div>

      </div>
      <div className="border-t-2 w-full h-0 lg:border-l-2 lg:border-t-0 lg:h-32 lg:w-0 border-red-300 mx-4 transition-all duration-300"></div>
      <div className="flex flex-col mr-10 items-center justify-center gap-4 ">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full lg:w-400 p-2 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
          value={reciterName}
          onChange={(e) => setreciterName(e.target.value)}
        />

        <div className="w-full lg:w-400 p-2 flex items-center rounded-md  shadow-sm border border-gray-300">
          <input
            type="text"
            placeholder="your email"
            className="w-full text-base font-semibold text-textColor outline-none bg-transparent"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </div>

        <div className="w-full lg:w-400 p-2 flex items-center rounded-md  shadow-sm border border-gray-300">
          <textarea
            type="text"
            placeholder="Message here"
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
              className="px-10 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
              onClick={saveReciter}
            >
              Send
            </motion.button>
          )}
        </div>
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
    </div>


    </motion.div>
  )
}

export default Contact;