import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Building2,
  Users,
  LineChart,
  Shield,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const EventOrganizerSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // Function to check if link is active
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  // Navigation links data
  const navLinks = [
    {
      path: "/eventOrganizer/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      path: "/eventOrganizer/manage-events",
      icon: <Calendar className="w-5 h-5" />,
      label: "Manage Events",
    },
    {
      path: "/eventOrganizer/event-communication",
      icon: <Building2 className="w-5 h-5" />,
      label: "Event Communication",
    },
    {
      path: "/eventOrganizer/event-analytics",
      icon: <Users className="w-5 h-5" />,
      label: "Event Analytics",
    },
    {
      path: "/eventOrganizer/volunteer&CharityOpportunities",
      icon: <LineChart className="w-5 h-5" />,
      label: "Volunteer & Charity Opportunities",
    },

    {
      path: "/eventOrganizer/settings",
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
    },
  ];

  return (
    <div className="flex">
      {/* Toggle Button (Visible on small screens) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg md:hidden focus:outline-none"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 shadow-xl`}
      >
        <div className="p-5 flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-900">
          <h1 className="text-2xl font-bold text-white">WedJoy EventOrganizer</h1>
          <button
            onClick={toggleSidebar}
            className="md:hidden focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-6 flex flex-col h-[calc(100vh-6rem)] justify-between px-3">
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.path} className="relative">
                {isActive(link.path) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl transform scale-105 shadow-lg z-0 opacity-90"></div>
                )}
                <Link
                  to={link.path}
                  className={`flex items-center p-3 rounded-lg transition-all duration-300 relative z-10 ${
                    isActive(link.path)
                      ? "text-white font-medium"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white hover:translate-x-1"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isActive(link.path)
                        ? "bg-white text-blue-600"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  >
                    {link.icon}
                  </div>
                  <span
                    className={`ml-3 ${
                      isActive(link.path) ? "font-semibold" : ""
                    }`}
                  >
                    {link.label}
                  </span>
                  {isActive(link.path) && (
                    <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-1.5 h-10 bg-white rounded-l-full"></div>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Logout Section */}
          <div>
            <hr className="border-gray-700 my-4" />
            <button
              onClick={handleLogout}
              className="flex items-center p-3 w-full rounded-lg hover:bg-gray-800 transition-all duration-300 text-gray-300 hover:text-white group"
            >
              <div className="p-2 rounded-lg text-gray-400 group-hover:text-white">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Overlay (Visible on small screens when sidebar is open) */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 mt-16 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default EventOrganizerSidebar;
