 import React, { useState, useEffect, useRef } from "react";
import { CiBellOn } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import { useAuth } from "../Context/AuthContext"; 
import Login from '../Components/Login'

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const dropdownRef = useRef(null);

  // ✅ Outside click par dropdown band ho jaye
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between bg-gray-100 px-4 py-3 shadow-md">
      <div className="text-xl font-bold text-gray-700">Dashboard</div>

      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {/* Notifications */}
        <button className="p-2 rounded-full hover:bg-gray-200">
          <CiBellOn className="text-2xl text-gray-600" />
        </button>

        {/* Settings */}
        <button className="p-2 rounded-full hover:bg-gray-200">
          <IoIosSettings className="text-2xl text-gray-600" />
        </button>

        {/* User Dropdown Button */}
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-3 py-2 rounded-full"
        >
          <FcBusinessman className="text-2xl" />
          

           <span className="hidden sm:flex flex-col items-start font-medium text-gray-700">
  <span className="text-gray-900 text-sm sm:text-base font-semibold">
    {user?.name || "Guest"}
  </span>
  <span className="text-gray-500 text-xs sm:text-sm italic">
    {user?.role || "No role"}
  </span>
</span>
        </div>
        
        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-14 w-48 bg-white shadow-lg rounded-lg overflow-hidden border z-50">
            <div className="px-4 py-2 text-gray-700 font-medium border-b">
              {user?.name}
            </div>
            <ul className="text-gray-600">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </li>
              <li
                className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                onClick={() => {
                  sessionStorage.clear();
                  window.location.reload();
                  <Login/>
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
