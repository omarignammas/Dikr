import React, { useState } from "react";
import { motion } from "framer-motion";
import moment from "moment";
import { AiOutlineMessage, AiOutlineDelete } from "react-icons/ai";
import { useStatevalue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { getAllUsers, changingUserRole, removeUser } from "../api";

export const DashboardUserCard = ({ data,index }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateRole, setIsUpdateRole] = useState(false);
  const [isDeleteUser, setIsDeleteUser] = useState(false);

  const [{ user }, dispatch] = useStatevalue();

  const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY");

  const UpdateUserRole = (userId, role) => {
    setIsLoading(true);
    setIsUpdateRole(false);
    changingUserRole(userId, role).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });
        setIsLoading(false);
      }
    });
  };

  const deleteuser = (userId) => {
    setIsLoading(true);
    removeUser(userId).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
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
      className="relative w-full font-Euclid rounded-md flex items-center justify-between py-5 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md"
    >
      <p className="w-180 flex items-center justify-center">
        <img
          src={data.imageURL}
          alt="profile"
          className="h-12 w-12 rounded-full border-2 object-cover border-red-300 shadow-lg"
          referrerPolicy="no-referrer"
        />
      </p>
      <p className="w-180 text-sm font-semibold font-Euclid text-center text-gray-600">{data.name}</p>
      <p className="w-180 min-w-[190px] text-sm text-center font-medium text-gray-600">
        {data.email}
      </p>
      {data.email_verified === "true" ? (
        <p className={`w-180 text-sm font-extrabold text-center text-green-600 font-Euclid`}>
        Yes
      </p>
      )
      :
      <p className={`w-180 text-sm font-extrabold  text-center text-red-600 font-Euclid`}>
        No
      </p>
      } 

      <p className="w-180 text-sm text-center font-semibold text-gray-500">
      {createdAt}
      </p>
      <p
        className={
          data.role === "Admin"
            ? "w-180 text-sm md:w-150 text-center font-bold text-green-500"
            : "w-180 text-sm md:w-150 text-center font-bold text-yellow-500"
        }
      >
        {data.role}
      </p>
      <p className="w-180 md:w-150 flex justify-center">
        <AiOutlineDelete
          className="text-2xl ml-5 w-90 md:w-90 text-red-600 cursor-pointer text-center hover:text-red-400"
          onClick={() => setIsDeleteUser(true)}
        />
        <AiOutlineMessage
          className="text-2xl  w-90 md:w-90 text-blue-600 cursor-pointer text-center hover:text-blue-400"
          
        />
      </p>
      {data._id !== user?.user._id ? (
        <motion.p
          whileTap={{ scale: 0.75 }}
          className={
            data.role === "Admin"
              ? "text-[10px] w-180  font-semibold text-purple-600 px-2 py-1 text-center bg-purple-200 rounded-sm hover:shadow-md"
              : "text-[10px] w-180  font-semibold text-green-600 px-2 py-1 text-center bg-green-200 rounded-sm hover:shadow-md"
          }
          onClick={() => setIsUpdateRole(true)}
        >
          {data.role === "Admin" ? "Member" : "Admin"}
        </motion.p>
      ) : (
        <p className="text-[10px] w-180  font-semibold text-textColor px-2 text-center bg-gray-200 rounded-sm">
          You cannot change your own role
        </p>
      )}
      {isDeleteUser && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute z-10 top-6 right-4 rounded-md p-4 flex items-start flex-col gap-4 bg-cardOverlay backdrop-blur-md shadow-xl"
        >
          <p className="text-textColor text-sm font-semibold">
            Are you sure you want to delete this user{" "}
            <span>{data.name}</span>?
          </p>
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="outline-none border-none backdrop-blur-sm text-sm px-4 py-1 rounded-md bg-green-200 text-black hover:shadow-md"
              onClick={() => {
                deleteuser(data._id);
                setIsDeleteUser(false);
              }}
            >
              Yes
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="outline-none border-none text-sm px-4 py-1 rounded-md bg-red-200 text-black hover:shadow-md"
              onClick={() => setIsDeleteUser(false)}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
      {isUpdateRole && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute z-10 top-4 right-4   rounded-md p-4 flex items-start flex-col gap-4 bg-cardOverlay backdrop-blur-md shadow-xl"
        >
          <p className="text-textColor text-sm font-semibold">
            Are you sure you want to mark the user as{" "}
            <span>{data.role === "Admin" ? "Member" : "Admin"}</span>?
          </p>
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="outline-none border-none text-sm px-4 py-1  rounded-md bg-green-200 text-black hover:shadow-md"
              onClick={() =>
                UpdateUserRole(
                  data._id,
                  data.role === "Admin" ? "Member" : "Admin"
                )
              }
            >
              Yes
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="outline-none border-none text-sm px-4 py-1 rounded-md bg-red-200 text-black hover:shadow-md"
              onClick={() => setIsUpdateRole(false)}
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
