import React from "react";

const RecentCard = ({ category, amount, date, iconClass }) => {
  return (
    <div className="shadow-sm w-[95%] md:w-[90%] lg:w-[85%] h-16 md:h-20 m-auto mt-4 flex items-center p-2 md:p-4 bg-white rounded-lg">
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex-shrink-0 bg-gray-200 flex items-center justify-center">
        <i className={`${iconClass || "fa-solid fa-receipt"} text-xl md:text-2xl text-gray-600`}></i>
      </div>
      <div className="h-full w-full flex justify-between items-center px-3 md:px-5">
        <div>
          <h1 className="text-lg md:text-xl">{category}</h1>
          <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</p>
        </div>
        <h1 className="text-lg md:text-xl font-semibold">${amount}</h1>
      </div>
    </div>
  );
};

export default RecentCard;
