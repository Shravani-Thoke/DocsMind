import React from "react";

const StatCard = ({ title, value, icon, iconBg }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-start hover:shadow-md transition">
      <div>
        <p className="text-gray-500 text-sm uppercase font-medium">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-3">
          {value}
        </h2>
      </div>

      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${iconBg}`}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard;