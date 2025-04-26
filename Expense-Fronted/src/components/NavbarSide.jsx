import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavbarSide = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { to: "/", icon: "fa-tachometer-alt", color: "text-blue-500", label: "Dashboard" },
    { to: "/expense", icon: "fa-money-bill-wave", color: "text-yellow-500", label: "Expense" },
    { to: "/create-expense", icon: "fa-plus", color: "text-green-500", label: "Create Expense" },
  ];

  return (
    <div className="bg-white min-h-screen md:w-[18vw] p-4 shadow-2xl w-[40px] hidden md:block">
      <h1 className="font-bold text-lg md:text-2xl lg:text-3xl hidden md:block">
        Expense Tracker
      </h1>

      {/* Search Bar */}
      <div className="hidden md:flex w-[95%] h-[40px] md:h-[50px] mt-5 md:mt-7">
        <div className="p-2 md:p-3 bg-gray-300 rounded-l-lg">
          <i className="fas fa-search text-lg md:text-xl lg:text-2xl"></i>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-full h-full bg-gray-300 rounded-r-lg px-2 text-sm md:text-base"
        />
      </div>

      {/* Menu Items */}
      <div className="menu-items w-full mt-4 border-t border-gray-300">
        <h2 className="text-gray-300 text-sm md:text-base lg:text-lg md:mt-2">Main</h2>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="text-lg md:text-xl lg:text-2xl mt-6 md:mt-3">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `md:p-3 lg:p-4 rounded-2xl flex items-center gap-3 ${isActive ? "bg-blue-200 text-blue-500" : "hover:bg-blue-200 hover:text-blue-500"
                  }`
                }
              >
                <i className={`fas ${item.icon} ${item.color} text-base md:text-lg lg:text-xl`}></i>
                <span className="text-sm md:text-base lg:text-lg">{item.label}</span>
              </NavLink>
            </li>
          ))}

          {/* Logout as a Menu Item */}
          <li className="text-lg md:text-xl lg:text-2xl mt-6 md:mt-3">
            {/* <button
              onClick={handleLogout}
              className="w-full md:p-3 lg:p-4 rounded-2xl flex items-center gap-3 hover:bg-red-100 text-red-600 hover:text-red-700 transition"
            >
              <i className="fas fa-sign-out-alt text-base md:text-lg lg:text-xl"></i>
              <span className="text-sm md:text-base lg:text-lg">Logout</span>
            </button> */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full md:p-3 lg:p-4 rounded-2xl flex items-center gap-3 hover:bg-red-100 text-red-600 hover:text-red-700 transition"
            >
              <i className="fas fa-sign-out-alt text-base md:text-lg lg:text-xl"></i>
              <span className="text-sm md:text-base lg:text-lg">Logout</span>
            </button>


          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarSide;
