import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  LayoutDashboard,
  Calendar,
  Briefcase,
  Users,
  FileText,
  BarChart2,
  Settings,
  ChevronLeft,
  LogOut,
} from "lucide-react";
// import { Outlet } from "react-router-dom";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // For large screen collapse
  const [isMobileOpen, setIsMobileOpen] = useState(false); // For mobile sidebar toggle

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Manage Events", path: "/admin/manage-events", icon: <Calendar size={20} /> },
    { name: "Manage Businesses", path: "/admin/manage-businesses", icon: <Briefcase size={20} /> },
    { name: "User Management", path: "/admin/user-management", icon: <Users size={20} /> },
    { name: "Content Moderation", path: "/admin/content-moderation", icon: <FileText size={20} /> },
    { name: "Reports & Analytics", path: "/admin/reports-analytics", icon: <BarChart2 size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex">
      {/* Sidebar for Large Screens */}
      <motion.div
        initial={{ width: isOpen ? 260 : 80 }}
        animate={{ width: isOpen ? 260 : 80 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed inset-y-[2.5%] left-2 bg-white shadow-xl border border-gray-200 rounded-2xl z-50 p-4 flex flex-col h-[95vh] transition-all duration-300"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-6">
          <div className={`flex items-center transition-all ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>
            <img src="/logo.png" alt="Logo" className="w-10 h-10" />
            <span className="text-purple-700 font-semibold text-lg ml-3">WedJoy</span>
          </div>
          <button onClick={toggleSidebar} className="p-2 bg-purple-500 text-white rounded-full shadow-md hover:bg-purple-600 transition">
            <ChevronLeft size={24} className={`${isOpen ? "rotate-0" : "rotate-180"}`} />
          </button>
        </div>

        {/* Navigation Links with 3D Effect */}
        <nav className="space-y-3 flex-1">
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, translateY: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={item.path}
                className="flex items-center space-x-3 p-3 bg-white hover:bg-purple-50 rounded-lg transition-all border border-gray-200 hover:border-purple-300"
              >
                <span className="text-purple-500">{item.icon}</span>
                {isOpen && <span className="text-gray-700">{item.name}</span>}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Logout Button */}
        <motion.div
          whileHover={{ scale: 1.05, translateY: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-auto"
        >
          <button
            className="flex items-center space-x-3 p-3 bg-white hover:bg-purple-50 rounded-lg transition-all border border-gray-200 hover:border-purple-300 w-full"
          >
            <span className="text-purple-500"><LogOut size={20} /></span>
            {isOpen && <span className="text-gray-700">Logout</span>}
          </button>
        </motion.div>
      </motion.div>

      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden">
        <button onClick={toggleMobileSidebar} className="fixed top-5 left-5 z-50 bg-purple-500 text-white p-2 rounded-full shadow-md hover:bg-purple-600 transition">
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMobileSidebar}></div>
      )}

      {/* Sidebar Content for Mobile */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isMobileOpen ? 0 : -250 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed inset-y-[2.5%] left-2 w-64 bg-white shadow-xl rounded-2xl z-50 p-4 flex flex-col border border-gray-200"
      >
        {/* Close Button for Mobile */}
        <button onClick={toggleMobileSidebar} className="self-end mb-4">
          <X size={24} className="text-purple-500 hover:text-purple-600 transition" />
        </button>

        {/* Sidebar Header for Mobile */}
        <div className="flex items-center mb-6">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-purple-700 font-semibold text-lg ml-3">WedJoy</span>
        </div>

        {/* Navigation Links for Mobile */}
        <nav className="space-y-3">
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, translateY: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={item.path}
                className="flex items-center space-x-3 p-3 bg-white hover:bg-purple-50 rounded-lg transition-all border border-gray-200 hover:border-purple-300"
                onClick={toggleMobileSidebar}
              >
                <span className="text-purple-500">{item.icon}</span>
                <span className="text-gray-700">{item.name}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Logout Button for Mobile */}
        <motion.div
          whileHover={{ scale: 1.05, translateY: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-auto"
        >
          <button
            className="flex items-center space-x-3 p-3 bg-white hover:bg-purple-50 rounded-lg transition-all border border-gray-200 hover:border-purple-300 w-full"
          >
            <span className="text-purple-500"><LogOut size={20} /></span>
            <span className="text-gray-700">Logout</span>
          </button>
        </motion.div>
      </motion.div>
      {/* Main Content */}
      <div className="ml-[260px] p-6 w-full">
        <Outlet /> {/* This ensures child routes render inside AdminSidebar */}
      </div>
    </div>
  );
};


export default AdminSidebar;