import React, { useState } from "react";
import { motion } from "framer-motion";
import moment from "moment";
import { AiOutlineDelete } from "react-icons/ai";
import { useStatevalue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { removeRecite, getAllRecites } from "../api";

export const DashboardReciteCard = ({ data,index }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isDeleteRecite, setIsDeleteRecite] = useState(false);

  const [{ allRecites }, dispatch] = useStatevalue();

  const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY");


  const deleterecite = (reciteId) => {
    setIsLoading(true);
    removeRecite(reciteId).then((res) => {
      if (res) {
        getAllRecites().then((data) => {
          dispatch({
            type: actionType.SET_ALL_RECITES,
            allRecites: data.data,
          });
        });
        setIsLoading(false);
      }
    });
  };

  return (
    <motion.div
     initial={{ opacity: 0, translateY: -50 }}
     animate={{ opacity: 1, translateY: 0 }}
     transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative w-full font-Euclid rounded-md flex items-center justify-between py-3 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md"
    >
      <p className="w-225 flex items-center justify-center">
        <img
          src={data.imageURL}
          alt="profile"
          className="ml-3 h-14 w-14 rounded-sm border-2 object-cover border-red-300 shadow-lg"
          referrerPolicy="no-referrer"
        />
        <p className="w-200 text-xl flex flex-col font-semibold font-Euclid text-center gap-1 text-gray-600">
            {data.name}
            <p className="w-160 text-sm font-Euclid text-lighttextGray">{data.Reciter}</p>
        </p>

      </p>
      <p className="w-100 text-md font-Euclid font-bold text-lighttextGray">{data.Album}</p>
      <p className="w-180 text-sm text-center font-semibold text-gray-500">
      {createdAt}
      </p>
      
      <p className="w-180 md:w-150 flex justify-center gap-2">
        <AiOutlineDelete
          className="text-2xl w-180 md:w-150 text-red-600 cursor-pointer text-center hover:text-red-400"
          onClick={() => setIsDeleteRecite(true)}
        />
      </p>
      {isDeleteRecite && (
        <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
          className="absolute z-10 top-6 right-4 rounded-md p-4 flex items-start flex-col gap-4  bg-lightOverlay backdrop-blur-sm shadow-xl"
        >
          <p className="text-textColor text-sm font-semibold">
            Are you sure you want to delete this Recite{" "}
            <span>{data.name}</span> ?
          </p>
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="outline-none border-none text-sm px-4 py-1 rounded-md bg-green-200 text-black hover:shadow-md"
              onClick={() => {
                deleterecite(data._id);
                setIsDeleteRecite(false);
              }}
            >
              Yes
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="outline-none border-none text-sm px-4 py-1 rounded-md bg-red-200 text-black hover:shadow-md"
              onClick={() => setIsDeleteRecite(false)}
            >
              No
            </motion.button>
          </div>
          
        </motion.div>
      )}
      {isLoading && (
        <div className="absolute inset-0 bg-card animate-pulse"></div>
      )}
    </motion.div>
  );
};
