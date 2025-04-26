import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom"; // Import the navigate hook from React Router

const NavbarTop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  // Sample menu items (replace with your actual menu items)
  const menuItems = [
    { to: "/", icon: "fa-tachometer-alt", color: "text-blue-500", label: "Dashboard" },
    { to: "/expense", icon: "fa-money-bill-wave", color: "text-yellow-500", label: "Expense" },
    { to: "/create-expense", icon: "fa-plus", color: "text-green-500", label: "Create Expense" },
  
  ];

  const handleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="relative">
      {/* Top Navbar */}
      <nav className="bg-white h-[8vh] w-full md:hidden flex justify-between items-center p-3 shadow-md fixed top-0 left-0 z-50">
        <h1 className="font-bold text-3xl">Expense Tracker</h1>
        <div className="mr-5 z-50" onClick={handleNav}>
          {isOpen ? (
            <i className="fa-solid fa-xmark text-3xl"></i>
          ) : (
            <i className="fa-solid fa-bars text-3xl"></i>
          )}
        </div>
      </nav>

      {/* Sidebar & Overlay */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleNav}
          ></div>

          {/* Sidebar Menu */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 bg-white w-[75vw] h-screen shadow-2xl z-50 p-5"
          >
            <h1 className="font-bold text-3xl mb-5">Menu</h1>

            <div className="menu-items w-full mt-4 border-t border-gray-300">
              <h2 className="text-gray-500 text-lg mt-2">Main</h2>
              <ul>
                {/* Render menu items */}
                {menuItems.map((item, index) => (
                  <li key={index} className="text-lg mt-5">
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `p-3 rounded-lg flex items-center gap-3 ${isActive ? "bg-blue-200 text-blue-500" : "hover:bg-blue-200 hover:text-blue-500"}`
                      }
                      onClick={() => setIsOpen(false)} // Close menu on click
                    >
                      <i className={`fas ${item.icon} ${item.color} text-xl`}></i>
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}

                {/* Logout Button */}
                <li className="text-lg md:text-xl lg:text-2xl mt-6 md:mt-3">
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
          </motion.div>
        </>
      )}
    </div>
  );
};

export default NavbarTop;
