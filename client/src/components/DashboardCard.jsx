import React from "react";


export const DashboardCard = ({ icon, name, count }) => {

    return (
      
      <div className="p-4 w-250 gap-4 h-180 rounded-lg shadow-lg flex flex-col items-center justify-center">
        {icon}
        <p className="text-xl text-textColor font-Euclid font-semibold">{name}</p>
        <p className="text-2xl font-Euclid font-semibold ease-in-out text-red-400">{count}+</p>
      </div>
    );
  };