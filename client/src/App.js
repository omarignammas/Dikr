import React, { useEffect, useState } from "react";
import "./index.css";
import { 
  Loader, 
  UserProfile, 
  Dashboard, 
  Home, 
  Login, 
  RecitePlayer, 
  Recites, 
  About, 
  Contact, 
  HomePodcasts,
  PodcastPlayer, 
  RecitersSection
} from "./components/index";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { ValidateUser, getAllRecites } from "./api";
import { actionType } from "./context/reducer";
import { useStatevalue } from './context/StateProvider';
import { motion } from "framer-motion";

const App = () => {
  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true");
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const location = useLocation();
  const [{ user, isAudioPlaying, allRecites }, dispatch] = useStatevalue();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuth(true);
        userCred.getIdToken().then((token) => {
          ValidateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
        setIsLoading(false);
      } else {
        setAuth(false);
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        setIsLoading(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, [dispatch, firebaseAuth, navigate]);

  useEffect(() => {
    if (!allRecites && user) {
      getAllRecites().then((data) => {
        dispatch({
          type: actionType.SET_ALL_RECITES,
          allRecites: data,
        });
      });
    }
  }, [allRecites, dispatch]);

  const getPlayerComponent = () => {
    if (location.pathname === "/") {
      return <RecitePlayer />;
    }
    if (location.pathname === "/podcasts") {
      return <PodcastPlayer />;
    }
    return null;
  };

  return (
    <AnimatePresence mode="wait">
      <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center">
        {isLoading ||
          (!user && (
            <div className="fixed inset-0 bg-loaderOverlay backdrop-blur-sm ">
              <Loader />
            </div>
          ))}
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Home />} />
          <Route path="/podcasts" element={<HomePodcasts />} />
          <Route path="/About" element={<About />} />
          <Route path="/Recites" element={<Recites />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Dashboard/*" element={<Dashboard />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/ReciterSection" element={<RecitersSection />} />
        </Routes>

        {isAudioPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            {getPlayerComponent()}
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default App;
