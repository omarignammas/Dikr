import React, { useEffect, useState } from "react";
import "./index.css";
import Login from './components/Login';
import Home from './components/Home'; 
import Dashboard from "./components/Dashboard";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { Route, Routes, useNavigate } from "react-router-dom";
import {AnimatePresence} from 'framer-motion';
import { ValidateUser } from "./api";
import { actionType } from "./context/reducer";
import {useStatevalue} from  './context/StateProvider';


const App = () => {
  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true");
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [{user},dispatch] = useStatevalue();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuth(true);
        userCred.getIdToken().then((token) => {
          ValidateUser(token).then((data) => {
            //console.log(data);
            dispatch({
              type : actionType.SET_USER,
              user : data,
            })
          });
        });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        dispatch({
          type : actionType.SET_USER,
          user : null,
        });
        navigate("/login");
      }
    });
  }, [dispatch, firebaseAuth, navigate]);

  return (
  <AnimatePresence mode="wait">
   <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center" >
    <Routes>
      <Route path="/login" element={<Login setAuth={setAuth} />} />
      <Route path="/*" element={<Home />} /> 
      <Route path="/Dashboard/*" element={<Dashboard />} /> 
    </Routes>
   </div>
  </AnimatePresence>
  
  );
};

export default App;
