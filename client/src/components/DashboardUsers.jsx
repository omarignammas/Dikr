import React, { useEffect, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { DashboardUserCard } from "./DashboardUserCard";
import { motion } from "framer-motion";
import { getAllUsers } from "../api";
import { actionType } from "../context/reducer";
import { useStatevalue } from "../context/StateProvider";
import { CiSearch } from "react-icons/ci";
import { FcApproval } from "react-icons/fc";


const DashboardUsers = () => {
  const [emailFilter, setEmailFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [{ allUsers }, dispatch] = useStatevalue();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!allUsers) {
        const data = await getAllUsers();
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data,
        });
      }
    };

    fetchUsers();
  }, [allUsers, dispatch]);

 
  useEffect(() => {
    // console.log(filteredUsers);
    if (emailFilter) {
      const filtered = allUsers.Users.filter(
        // prettier-ignore
        (data) =>  data.email.includes(emailFilter) || data.name.includes(emailFilter) || data.role.includes(emailFilter)
      );
      setFilteredUsers(filtered);
    }
  }, [emailFilter]);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-4">
        <input
          type="text"
          placeholder="Search here"
          className={`w-64 px-4 py-3 border ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          } rounded-md bg-transparent outline-none duration-200 transition-all ease-in-out text-base text-textColor font-semibold`}
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />
        <CiSearch className="text-2xl font-semibold text-textColor cursor-pointer" />
        <motion.i
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.75 }}
          onClick={() => {
            setEmailFilter("");
          }}
        >
          <AiOutlineClear className="text-2xl text-textColor cursor-pointer" onClick={() => setFilteredUsers([]) } />
        </motion.i>
      </div>
      <div className="relative w-full py-12 overflow-x-auto  my-4 flex flex-col items-center justify-start p-4 shadow-xl rounded-md gap-3">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-Kodchasan font-semibold flex gap-1 text-textColor">
              {filteredUsers.length || allUsers?.Users.length} Users <FcApproval className="mt-1"/>
            </span>
            
          </p>
          
        </div>
        
        <div className="w-full min-w-[750px] flex flex-col">
          <div className="flex font-Kodchasan backdrop-opacity-15 items-center justify-between bg-slate-200 py-2">
            <p className="w-170 text-sm text-textColor font-semibold text-center">Profile</p>
            <p className="w-170 text-sm text-textColor font-semibold text-center">Name</p>
            <p className="w-170 text-sm text-textColor font-semibold text-center">Email</p>
            <p className="w-170 text-sm text-textColor font-semibold text-center">Verified</p>
            <p className="w-170 text-sm text-textColor font-semibold text-center">Created</p>
            <p className="w-170 text-sm text-textColor font-semibold text-center">Role</p>
            <p className="w-170 text-sm text-textColor font-semibold text-center">Actions</p>
            <p className="w-170 text-sm text-textColor font-semibold text-center">Update</p>
          </div>
          {(filteredUsers.length > 0 ? filteredUsers : allUsers?.Users)?.map((data, i) => (
            <DashboardUserCard data={data} key={data._id} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardUsers;
