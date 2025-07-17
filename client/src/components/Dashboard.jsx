import React, { useState } from 'react';
import Header from './Header'; 
import { FcHome } from "react-icons/fc"; 
import { FaUsers, FaMicrophone, FaMusic, FaPodcast, FaCompactDisc, FaPlus, FaBars, FaTimes, FaBook } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import {
  DashBoardHome,
  DashboardUsers,
  DashboardReciters,
  DashboardRecites,
  DashboardAlbums,
  DashboardNewRecite,
  DashboardNewPodcasts,
  DashboardPodcasts,
  DashboardBooks,
  DashboardNewBook
} from '../components/index';
import { Route, Routes } from 'react-router-dom';
import DashboardNewAlbum from './DashboardNewAlbum';
import DashboardNewReciter from './DashboardNewReciter';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Navigation items avec icônes
  const navItems = [
    { path: "/dashboard/home", label: "Home", icon: <FcHome className="text-xl" /> },
    { path: "/dashboard/user", label: "Users", icon: <FaUsers className="text-xl text-blue-500" /> },
    { path: "/dashboard/reciters", label: "Reciters", icon: <FaMicrophone className="text-xl text-green-500" /> },
    { path: "/dashboard/recites", label: "Recitations", icon: <FaMusic className="text-xl text-purple-500" /> },
    { path: "/dashboard/podcasts", label: "Podcasts", icon: <FaPodcast className="text-xl text-orange-500" /> },
    { path: "/dashboard/albums", label: "Albums", icon: <FaCompactDisc className="text-xl text-red-500" /> },
    { path: "/dashboard/books", label: "Books", icon: <FaBook className="text-xl text-teal-500" /> },
  ];

  // Actions rapides
  const quickActions = [
    { path: "/dashboard/newRecite", label: "New Recitation", icon: <FaPlus className="text-sm" /> },
    { path: "/dashboard/newPodcast", label: "New Podcast", icon: <FaPlus className="text-sm" /> },
    { path: "/dashboard/newReciter", label: "New Reciter", icon: <FaPlus className="text-sm" /> },
    { path: "/dashboard/newAlbum", label: "New Album", icon: <FaPlus className="text-sm" /> },
    { path: "/dashboard/newBook", label: "New Book", icon: <FaPlus className="text-sm" /> },

  ];

  return (
    <div className="flex  mt-20 min-h-screen w-full">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64  shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-Questria font-bold text-red-500">Dashboard</h2>
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <FaTimes className="lg:hidden text-lg" />
          </button>
        </div>

        {/* Navigation principale */}
        <nav className="p-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Navigation
          </h3>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions rapides */}
        <div className="p-4 border-t">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Actions rapides
          </h3>
          <ul className="space-y-2">
            {quickActions.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-3 py-2 rounded-lg transition-colors duration-200 text-sm
                    ${isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3 p-1 bg-gray-200 rounded">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header avec bouton menu mobile */}
        <div className="bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className=" p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <FaBars className="text-lg" />
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 pt-24 md:pt-6">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/home" element={<DashBoardHome />} />
              <Route path="/user" element={<DashboardUsers />} />
              <Route path="/recites" element={<DashboardRecites />} />
              <Route path="/newRecite" element={<DashboardNewRecite />} />
              <Route path="/podcasts" element={<DashboardPodcasts />} />
              <Route path="/newPodcast" element={<DashboardNewPodcasts />} />
              <Route path="/reciters" element={<DashboardReciters />} />
              <Route path="/newReciter" element={<DashboardNewReciter />} />
              <Route path="/albums" element={<DashboardAlbums />} />
              <Route path="/newAlbum" element={<DashboardNewAlbum />} />
              <Route path="/books" element={<DashboardBooks />} />
              <Route path="/newBook" element={<DashboardNewBook />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;