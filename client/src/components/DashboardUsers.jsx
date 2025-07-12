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
    if (emailFilter) {
      const filtered = allUsers.Users.filter(
        (data) => 
          data.email.includes(emailFilter) || 
          data.name.includes(emailFilter) || 
          data.role.includes(emailFilter)
      );
      setFilteredUsers(filtered);
    }
  }, [emailFilter, allUsers]);

  // Memoization pour éviter les re-renders inutiles
  const displayUsers = filteredUsers.length > 0 ? filteredUsers : allUsers?.Users || [];

  return (
    // Container principal avec background fixe
    <div className="min-h-screen w-full bg-primary"> {/* Ajoutez votre couleur de fond ici */}
      <div className="container mx-auto px-4 py-6">
        
        {/* Section de recherche */}
        <div className="mb-6">
          <div className="flex justify-center items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className={`w-80 px-4 py-3 pl-10 border ${
                  isFocus ? "border-gray-500 shadow-lg" : "border-gray-300"
                } rounded-lg bg-white outline-none duration-200 transition-all ease-in-out text-base text-gray-700 font-medium`}
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
                onBlur={() => setIsFocus(false)}
                onFocus={() => setIsFocus(true)}
              />
              <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400" />
            </div>
            
            {emailFilter && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setEmailFilter("");
                  setFilteredUsers([]);
                }}
                className="p-3 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <AiOutlineClear className="text-xl text-gray-600" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Section principale du tableau */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          
          {/* Header avec statistiques */}
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-md font-Inter font-medium text-gray-800">Users Management</h2>
                <FcApproval className="text-xl" />
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {displayUsers.length} Users
                </span>
              </div>
            </div>
          </div>

          {/* Tableau avec scroll horizontal */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]"> {/* Largeur minimale pour éviter le scroll sur desktop */}
              
              {/* Header du tableau */}
              <div className="grid grid-cols-8 gap-5 px-6 py-4 bg-gray-100 border-b font-semibold text-sm text-gray-700">
                <div className="text-center">Profile</div>
                <div className="text-center">Name</div>
                <div className="text-center">Email</div>
                <div className="text-center">Verified</div>
                <div className="text-center">Created</div>
                <div className="text-center">Role</div>
                <div className="text-center">Actions</div>
                <div className="text-center">Update</div>
              </div>

              {/* Body du tableau */}
              <div className="divide-y mr-2 divide-gray-200">
                {displayUsers.length > 0 ? (
                  displayUsers.map((data, i) => (
                    <DashboardUserCard 
                      data={data} 
                      key={data._id} 
                      index={i} 
                    />
                  ))
                ) : (
                  <div className="px-6 py-12 text-center text-gray-500">
                    <p className="text-lg">No users found</p>
                    <p className="text-sm">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUsers;