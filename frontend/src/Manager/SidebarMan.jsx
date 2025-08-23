 import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaShoppingBag,
  FaChartBar,
  FaUserCog,
} from 'react-icons/fa';
import { MdOutlineManageAccounts } from "react-icons/md";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setOpen(!open);
  const toggleDropdown = (key) =>
    setOpenDropdown(openDropdown === key ? null : key);

  const menu = [
    { key: 'home', label: 'Dashboard', icon: <FaHome />, path: '/Dashboard' },
    {
      key: 'products',
      label: 'Employees',
      icon: <MdOutlineManageAccounts />,
      path: '/employee'
       
    },
    { key: 'analytics', label: 'To-Do', icon: <FaChartBar />, path: '/ToDO' },
    
  ];

  return (
    <div className="flex min-h-screen">
    
      <aside
        className={`bg-gray-100 transition-all duration-300 flex flex-col shadow-md
        ${open ? 'w-[auto]' : 'w-16'} fixed inset-y-0`}
      >
        
        <div className="flex items-center justify-between h-16 px-3 border-b">
          {open && <span className="text-xl font-bold text-gray-700">AdminPanel</span>}
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        
        <nav className="mt-4 flex-1 overflow-y-auto">
          {menu.map((item) => (
            <div key={item.key}>
              <div
                className="flex items-center px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() =>
                  item.children ? toggleDropdown(item.key) : navigate(item.path)
                }
              >
                <span className="text-lg">{item.icon}</span>
                {open && (
                  <>
                    <span className="ml-3 flex-1 text-gray-700">{item.label}</span>
                    {item.children && (
                      <svg
                        className={`w-4 h-4 transform transition-transform ${
                          openDropdown === item.key ? 'rotate-90' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </>
                )}
              </div>

              {/* Submenu */}
               
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`${open ? 'ml-45' : 'ml-16'} flex-1 transition-all duration-300   bg-gray-50`}
      >
        <Outlet />
      </main>
    </div>
  );
}
