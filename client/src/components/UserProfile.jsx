
import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { motion } from "framer-motion";
import { useStatevalue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const FilterButtons = ({ filterData, flag }) => {
  const [filterName, setFilterName] = useState(null);
  const [filterMenu, setFilterMenu] = useState(false);

  const [{ reciterFilter, albumFilter, podcasterFilter, filterTerm }, dispatch] = useStatevalue();

  const updateFilterButton = (name) => {
    setFilterName(name);
    setFilterMenu(false);

    switch (flag) {
      case "Reciter":
        dispatch({ type: actionType.SET_RECITER_FILTER, reciterFilter: name });
        break;
      case "Podcaster":
        dispatch({ type: actionType.SET_PODCASTER_FILTER, podcasterFilter: name });
        break;
      case "Albums":
        dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: name });
        break;
      case "Language":
        dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: name });
        break;
      case "Category":
        dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: name });
        break;
      default:
        break;
    }
  };

  return (
    <div className="border shadow-sm border-gray-300 rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-400">
      <p
        className="text-base tracking-wide text-textColor flex items-center gap-2"
        onClick={() => setFilterMenu(!filterMenu)}
      >
        {!filterName && flag}
        {filterName && (
          <>
            {filterName.length > 15 ? `${filterName.slice(0, 14)}...` : filterName}
          </>
        )}
        <IoChevronDown
          className={`text-base text-textColor duration-150 transition-all ease-in-out ${
            filterMenu ? "rotate-180" : "rotate-0"
          }`}
        />
      </p>
      {filterData && filterMenu && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 py-2 flex flex-col rounded-md shadow-md absolute top-8 left-0"
        >
          {filterData?.map((data) => (
            <div
              key={data._id}
              className="flex items-center gap-2 px-4 py-1 hover:bg-gray-200"
              onClick={() =>
                flag === "Reciter"
                  ? updateFilterButton(data.name)
                  : flag === "Podcaster"
                  ? updateFilterButton(data.Podcaster)
                  : flag === "Albums"
                  ? updateFilterButton(data.Album)
                  : flag === "Language"
                  ? updateFilterButton(data.Language)
                  : null
              }
            >
              {/* Display Image */}
              {(flag === "Reciter" || flag === "Podcaster" || flag === "Albums") && (
                <img
                  src={data.imageURL}
                  className="w-8 min-w-[32px] h-8 rounded-full object-cover"
                  alt=""
                />
              )}

              {/* Display Name or Podcaster */}
              {flag === "Reciter" && (
                <p className="w-full">
                  {data.name && data.name.length > 15
                    ? `${data.name.slice(0, 15)}...`
                    : data.name}
                </p>
              )}
              {flag === "Podcaster" && (
                <p className="w-full">
                  {data.name  && data.name.length > 15
                    ? `${data.name.slice(0, 15)}...`
                    : data.name}
                </p>
              )}
              {flag === "Albums" && (
                <p className="w-full">
                  {data.name && data.name.length > 15
                    ? `${data.name.slice(0, 15)}...`
                    : data.name}
                </p>
              )}
              {flag === "Language" && (
                <p className="w-full">
                  {data.Language && data.Language.length > 15
                    ? `${data.Language.slice(0, 15)}...`
                    : data.Language}
                </p>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FilterButtons;
