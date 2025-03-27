import { useState } from "react";
import { Home, Users, Calendar, Settings, LogOut, Bell, Briefcase, FileText, MessageCircle, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div>
      {/* Hamburger Button for Mobile */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)} 
        className="md:hidden p-3 fixed top-4 left-4 bg-purple-600 text-white rounded-full shadow-lg z-50">
        <Menu size={24} />
      </button>
      
      {/* Sidebar for Large Screens and Mobile */}
      <motion.div 
        initial={{ x: "-100%" }}
        animate={{ 
          x: isMobileOpen ? 0 : "-100%",
          width: isOpen ? "16rem" : "5rem"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-4 left-4 h-[95vh] bg-white/80 text-purple-700 shadow-[0px_4px_20px_rgba(128,0,128,0.4)] rounded-2xl p-4 font-['Outfit'] 
        ${isMobileOpen ? "translate-x-0 w-full max-w-xs" : "-translate-x-full"} md:translate-x-0`}>
        
        {/* Collapse Button for Large Screens */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:block mb-4 text-purple-600 hover:text-purple-400 transition self-end">
          {isOpen ? "⬅" : "➡"}
        </button>
        
        <div className="flex flex-col space-y-2 w-full mt-4">
          <NavItem icon={<Home size={24} />} text="Dashboard" isOpen={isOpen} />
          <NavItem icon={<Users size={24} />} text="Users" isOpen={isOpen} />
          <NavItem icon={<Calendar size={24} />} text="Events" isOpen={isOpen} />
          <NavItem icon={<Briefcase size={24} />} text="Business" isOpen={isOpen} />
          <NavItem icon={<FileText size={24} />} text="Reports" isOpen={isOpen} />
          <NavItem icon={<MessageCircle size={24} />} text="Messages" isOpen={isOpen} />
          <NavItem icon={<Bell size={24} />} text="Notifications" isOpen={isOpen} />
          <NavItem icon={<Settings size={24} />} text="Settings" isOpen={isOpen} />
        </div>
        <div className="mt-auto">
          <NavItem icon={<LogOut size={24} />} text="Logout" isOpen={isOpen} />
        </div>
      </motion.div>
    </div>
  );
}

function NavItem({ icon, text, isOpen }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, backgroundColor: "rgba(196, 181, 253, 0.5)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="flex items-center space-x-3 p-3 hover:bg-purple-300 hover:text-purple-900 rounded-lg cursor-pointer transition-all">
      {icon}
      <AnimatePresence>
        {isOpen && (
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="text-lg font-medium">
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}