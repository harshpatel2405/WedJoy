import React, { useState } from "react";
import { ChevronDown, Sun, Moon, Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'} shadow-md p-4 flex justify-end items-center fixed top-0 left-0 right-0 z-20 md:left-64 transition-all duration-300 ease-in-out`}>
      {/* Right Side: Icons and Profile */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className={`relative p-1 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} focus:outline-none transition-all duration-300 ease-in-out`}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <div className="relative">
            {/* Sun Icon */}
            <Sun 
              className={`w-5 h-5 absolute transform transition-all duration-500 ease-in-out ${
                isDarkMode 
                  ? 'translate-y-0 rotate-0 text-yellow-300' 
                  : 'translate-y-10 rotate-90 opacity-0'
              }`} 
            />
            
            {/* Moon Icon */}
            <Moon 
              className={`w-5 h-5 absolute transform transition-all duration-500 ease-in-out ${
                isDarkMode 
                  ? 'translate-y-10 -rotate-90 opacity-0' 
                  : 'translate-y-0 rotate-0 text-blue-600'
              }`} 
            />
          </div>
          
          {/* Spacer for proper button sizing */}
          <span className="opacity-0 w-5 h-5 inline-block">.</span>
        </button>

        {/* Notification Icon */}
        <button className={`relative p-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} focus:outline-none`}>
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>

        {/* Settings Icon */}
        <button className={`p-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} focus:outline-none`}>
          <Link to='/admin/settings'>
            <Settings className="w-6 h-6" />
          </Link>
        </button>

        {/* Profile Image and Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="Profile"
              className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
            />
            <span className={`hidden md:block font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              John Doe
            </span>
            <ChevronDown className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className={`absolute right-0 mt-2 w-48 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} rounded-lg shadow-lg border z-30`}>
              <ul>
                <li>
                  <Link
                    to="/admin/profile"
                    className={`block px-4 py-2 ${isDarkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className={`block px-4 py-2 ${isDarkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`block px-4 py-2 ${isDarkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;