import React from "react";

export const DashboardCard = ({ icon, name, count }) => {
  return (
    <div className="w-full sm:w-48 bg-white rounded-2xl shadow-md p-6 transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="bg-red-100 p-3 rounded-full">
          {React.cloneElement(icon, { className: "w-8 h-8 text-red-400" })}
        </div>
        <p className="text-lg font-semibold text-gray-700">{name}</p>
        <p className="text-2xl font-bold text-red-500">{count}+</p>
      </div>
    </div>
  );
};
