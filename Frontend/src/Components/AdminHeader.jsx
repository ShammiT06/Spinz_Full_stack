import React from "react";
// import userAvatar from "/path/to/avatar.jpg"; // replace with your image
import spinzWhite from "../assets/SpinzWhite.png"
import { signOut } from "firebase/auth";
import { auth } from "../config"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";



const Header = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    // Handle logout logic here
    console.log("Logout clicked");
    signOut(auth)

      .then(() => {
        console.log("User signed out successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      })
    
  }

  return (
    <header className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 flex items-center justify-between text-white shadow">
      {/* Logo */}
      <div className="flex justify-center items-center">                
        <img src={spinzWhite} alt="no image" className="w-[85px] h-[55px]" />
    </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Icons */}
        <button className="p-2 rounded border border-white hover:bg-white hover:text-pink-500 transition">
          {/* <Bell size={18} /> */}
        </button>
        <button className="p-2 rounded border border-white hover:bg-white hover:text-pink-500 transition">
          {/* <Mail size={18} /> */}
        </button>
        <button 
        onClick= { handleClick }
        className="p-2 rounded border border-white hover:bg-white hover:text-pink-500 transition">Log Out</button>

        {/* User Profile */}
        {/* <div className="flex items-center border border-white px-2 py-1 rounded hover:bg-white hover:text-pink-500 transition cursor-pointer">
          <img
            // src={userAvatar}
            alt="User Avatar"
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-sm font-medium">Derek Alvarado</span>
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div> */}
      <div className="relative w-fit text-black cursor-pointer select-none group">
      <select className="bg-transparent border px-5 py-3 rounded-md text-sm font-inter text-white min-w-[140px] focus:outline-none appearance-none pr-6">
        <option className="bg-[#925AC6] bg-opacity-25 ">Dashboard</option>
        <option className="bg-[#925AC6] bg-opacity-25">Admin</option>
        <option className="bg-[#925AC6] bg-opacity-25">Payment</option>
        <option className="bg-[#925AC6] bg-opacity-25">Log Out</option>
      </select>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none fill-white"
        viewBox="0 0 512 512"
      >
        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
      </svg>
  
      </div>
      </div>
    </header>
  );
};

export default Header;