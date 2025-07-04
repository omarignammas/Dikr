import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { removeReciter } from "../api";
import { useStatevalue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { getAllReciters } from "../api";
import {Card, CardFooter} from "@heroui/card";
import {Image} from "@heroui/image";
import { Button} from "@heroui/button";


const ReciterCard = ({ data, index }) => {
    const [isDeleteReciter, setIsDeleteReciter] = useState(false);
    const [{ allReciters }, dispatch] = useStatevalue();
    const [isLoading, setIsLoading] = useState(false);

    const deletereciter = (reciteId) => {
        setIsLoading(true);
        removeReciter(reciteId).then((res) => {
          if (res) {
            getAllReciters().then((data) => {
              dispatch({
                type: actionType.SET_ALL_RECITERS,
                allReciters: data.data,
              });
            });
            setIsLoading(false);
          }
        });
      }; 
    return (
      <div className="relative">
      <motion.div
        initial={{ opacity: 0, translateX: -50 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Card isFooterBlurred className="border-none shadow-lg" radius="lg">
          <Image
            alt="Album cover"
            className="object-cover"
            height={200}
            src={data?.imageURL}
            width={200}
          />
          <CardFooter className="justify-between before:bg-white/10  border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-grey/120">{data.name}</p>
            <motion.div whileTap={{ scale: 0.75 }}>
              <Button
                className="text-tiny text-white bg-black/20 hover:bg-black/30"
                color="default"
                radius="lg"
                size="sm"
                variant="flat"
                onClick={() => setIsDeleteReciter(true)}
                disabled={isLoading}
              >
                {isLoading ? "..." : "Delete"}
              </Button>
            </motion.div>
          </CardFooter>

          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Delete confirmation popup - External to card */}
      {isDeleteReciter && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -20 }}
          className="absolute top-full mt-2  bg-black/40 backdrop-blur-sm left-0 transform rounded-lg -translate-x-1/2  z-50 min-w-[280px]"
        >
          <div className=" rounded-lg p-4 shadow-2xl border dark:border-gray-700">
            {/* Arrow pointing up */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4  dark:bg-gray-800 border-l border-t border-gray-200 dark:border-gray-700 rotate-45"></div>
            
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 text-center">
                Are you sure you want to delete
              </p>
              <p className="text-sm font-bold text-gray-900 dark:text-white text-center">
                "{data.name}"?
              </p>
              
              <div className="flex items-center justify-center gap-3 mt-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                  onClick={() => {
                    deletereciter(data._id);
                    setIsDeleteReciter(false);
                  }}
                >
                  Yes, Delete
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md transition-colors"
                  onClick={() => setIsDeleteReciter(false)}
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Backdrop to close popup when clicking outside */}
      {isDeleteReciter && (
        <div 
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setIsDeleteReciter(false)}
        />
      )}
    </div>
  );
  };
  export default ReciterCard;

