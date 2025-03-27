import React from 'react'
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const digitVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-6 overflow-hidden">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-3xl border border-gray-100 overflow-hidden grid md:grid-cols-2 gap-0">
        {/* Left Side */}
        <div className="p-12 flex flex-col justify-center space-y-6 bg-white">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <AlertTriangle className="w-12 h-12 text-amber-500 animate-bounce" />
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              Oops! Error
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              The page you're searching for has either been moved, deleted, or might be taking an unexpected break.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex space-x-4"
          >
            <Link 
              to="/" 
              className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <Home className="mr-3 w-5 h-5" />
              Return Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-full shadow-md hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <ArrowLeft className="mr-3 w-5 h-5" />
              Go Back
            </button>
          </motion.div>
        </div>
        
        {/* Right Side */}
        <div className="bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center p-12 relative overflow-hidden">
          <motion.div 
            variants={numberVariants}
            initial="hidden"
            animate="visible"
            className="text-center z-10 flex flex-col items-center"
          >
            <div className="flex text-[12rem] font-black text-white/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {['4', '0', '4'].map((digit, index) => (
                <motion.span 
                  key={index} 
                  variants={digitVariants}
                  className="inline-block"
                >
                  {digit}
                </motion.span>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative z-20"
            >
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 200 200" 
                className="w-64 h-64 mx-auto mb-6 opacity-80"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <path 
                  d="M100 20 L180 100 L100 180 L20 100 Z" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="10" 
                  strokeLinecap="round" 
                  strokeDasharray="20 20"
                />
                <motion.circle 
                  cx="100" 
                  cy="100" 
                  r="30" 
                  fill="white" 
                  opacity="0.3"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                />
              </motion.svg>
              
              <p className="text-xl font-semibold text-white/90 max-w-xs mx-auto">
                The page you're looking for seems to have gone on an unexpected adventure
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default NotFound