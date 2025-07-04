import React, { useEffect }from "react";
import { useLocation} from "react-router-dom";
import { actionType } from "../context/reducer";
import { useStatevalue } from "../context/StateProvider";
import { getAllAlbums, getAllReciters,getAllRecites , getAllPodcasts,getAllPodcasters} from "../api";
import { filterByLanguage, filters } from "../utils/supportfunctions";
import FilterButtons from "./FilterButtons";
import { MdClearAll } from "react-icons/md";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {isNotActiveCategory,isActiveCategoryStyle} from "../utils/styles"



const Filter = ({ setFilteredaudios }) => {
  const location = useLocation(); // Hook pour obtenir l'URL actuelle
  const [{ filterTerm, allReciters, allAlbums, allRecites , allPodcasts , allPodcasters}, dispatch] = useStatevalue();

  useEffect(() => {
    if (!allReciters) {
      getAllReciters().then((data) => {
        dispatch({ type: actionType.SET_ALL_RECITERS, allReciters: data });
      });
    }
    if (!allPodcasters) {
      getAllPodcasters().then((data) => {
        dispatch({ type: actionType.SET_ALL_PODCASTERS, allPodcasters: data });
      });
    }


    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data });
      });
    }
    if (!allPodcasts) {
      getAllPodcasts().then((data) => {
        dispatch({ type: actionType.SET_ALL_PODCASTS, allPodcasts: data });
      });
    }

    if (!allRecites) {
      getAllRecites().then((data) => {
        dispatch({ type: actionType.SET_ALL_RECITES, allRecites: data });
      });
    }
  }, [dispatch, allReciters, allAlbums, allRecites]);

  // Déterminer le flag basé sur la route actuelle
  const currentFlag = location.pathname.includes("/podcasts")
    ? "Podcaster"
    : "Reciter";

  const updateFilter = (value) => {
    dispatch({
      type: actionType.SET_FILTER_TERM,
      filterTerm: value,
    });
  };

  const clearAllFilter = () => {
    setFilteredaudios(null);
    dispatch({ type: actionType.SET_PODCASTER_FILTER, podcasterFilter: null });
    dispatch({ type: actionType.SET_RECITER_FILTER, reciterFilter: null });
    dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
    dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
    dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
  };

  return (
    <div className="w-full my-4 px-6 py-4 flex items-center justify-start md:justify-center gap-10">
      <FilterButtons
  filterData={
    currentFlag === "Reciter"
      ? allReciters?.Reciters
      : currentFlag === "Podcaster"
      ? allPodcasters?.Podcasters 
      :[]
  }
  flag={currentFlag}
/>

      <div className=" flex items-center gap-6 mx-4">
        <NavLink
          to={"/"}
          onClick={clearAllFilter}
          className={({ isActive }) =>
            isActive ? isActiveCategoryStyle : isNotActiveCategory
          }
        >
          <p>Quran</p>
        </NavLink>
        <NavLink
          to={"/podcasts"}
          className={({ isActive }) =>
            isActive ? isActiveCategoryStyle : isNotActiveCategory
          }
        >
          <p>Podcasts</p>
        </NavLink>
        <NavLink
          to={"/Conferances"}
          className={({ isActive }) =>
            isActive ? isActiveCategoryStyle : isNotActiveCategory
          }
        >
          <p>Conferances</p>
        </NavLink>
        <NavLink
          to={"/Books"}
          className={({ isActive }) =>
            isActive ? isActiveCategoryStyle : isNotActiveCategory
          }
        >
          <p>Books</p>
        </NavLink>
      </div>

      <FilterButtons filterData={allAlbums?.Albums} flag={"Albums"} />

      <FilterButtons filterData={filterByLanguage} flag={"Language"} />

      <motion.i
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.75 }}
        onClick={clearAllFilter}
      >
        <MdClearAll className="text-textColor text-xl cursor-pointer" />
      </motion.i>
    </div>
  );
};

export default Filter;
