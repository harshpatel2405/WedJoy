// import React, { useState } from 'react'
// import { Link,useNavigate } from 'react-router-dom'

// const HeaderPreLogin = () => {
//   const [isLocationDetectModalOpen, setIsLocationDetectModalOpen] = useState(false);
//   const navigate = useNavigate();


//   const openModal = () => {
//     setIsLocationDetectModalOpen(true);
//   };

//   return (
//     <div>
//       <header className='shadow-lg font-[sans-serif] tracking-wide relative z-50'>
//       <section
//         className='flex items-center relative py-3 lg:px-10 px-4 border-gray-200 border-b bg-white lg:min-h-[70px] max-lg:min-h-[60px]'>
//         <a href="/" className="shrink-0 max-sm:hidden"><img
//           src="/diversity.png" alt="logo" className='sm:w-[45px] w-10' />
//         </a>
//         <a href="javascript:void(0)" className="hidden max-sm:block"><img src="https://readymadeui.com/readymadeui-short.svg" alt="logo" className='w-9' />
//         </a>

//         <div className='flex flex-wrap w-full items-center'>
//           <div className="relative lg:ml-10 max-md:mt-4 max-lg:ml-4">
//             <input type='text' placeholder='Search for events, stores, services...'
//               className='xl:w-80 max-lg:hidden bg-gray-100 border focus:bg-transparent px-4 rounded h-10 outline-none text-sm transition-all pl-10' />
//             <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" viewBox="0 0 24 24">
//               <path d="M10.5 2a8.5 8.5 0 1 0 6.36 14.36l5.64 5.64a1 1 0 0 0 1.41-1.41l-5.64-5.64A8.5 8.5 0 0 0 10.5 2zm0 15a6.5 6.5 0 1 1 6.5-6.5 6.5 6.5 0 0 1-6.5 6.5z"/>
//             </svg>
//           </div>
//           <div className="ml-auto">

//             <ul className='flex items-center'>
//               {/* <li className='max-md:hidden flex items-center text-[15px] max-lg:py-2 px-4 font-medium text-gray-800 cursor-pointer'>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24">
//                   <g data-name="Layer 2">
//                     <path
//                       d="M14.5 12.75A3.22 3.22 0 0 1 12 11.6a3.27 3.27 0 0 1-2.5 1.15A3.22 3.22 0 0 1 7 11.6a2.91 2.91 0 0 1-.3.31 3.22 3.22 0 0 1-2.51.82 3.35 3.35 0 0 1-2.94-3.37v-.71a4.76 4.76 0 0 1 .24-1.5l1.57-4.7a1.75 1.75 0 0 1 1.66-1.2h14.56a1.75 1.75 0 0 1 1.66 1.2l1.57 4.7a4.76 4.76 0 0 1 .24 1.5v.71a3.35 3.35 0 0 1-2.92 3.37 3.2 3.2 0 0 1-2.51-.82c-.11-.1-.22-.22-.32-.33a3.28 3.28 0 0 1-2.5 1.17zm-9.78-10a.26.26 0 0 0-.24.17l-1.56 4.7a3.27 3.27 0 0 0-.17 1v.71a1.84 1.84 0 0 0 1.57 1.88A1.75 1.75 0 0 0 6.25 9.5a.75.75 0 0 1 1.5 0 1.67 1.67 0 0 0 1.75 1.75 1.76 1.76 0 0 0 1.75-1.75.75.75 0 0 1 1.5 0 1.67 1.67 0 0 0 1.75 1.75 1.76 1.76 0 0 0 1.75-1.75.75.75 0 0 1 1.5 0 1.75 1.75 0 0 0 1.93 1.74 1.84 1.84 0 0 0 1.57-1.88v-.71a3.27 3.27 0 0 0-.17-1l-1.56-4.7a.26.26 0 0 0-.24-.17z"
//                       data-original="#000000" />
//                     <path
//                       d="M20 22.75H4A1.76 1.76 0 0 1 2.25 21v-9.52a.75.75 0 0 1 1.5 0V21a.25.25 0 0 0 .25.25h16a.25.25 0 0 0 .25-.25v-9.53a.75.75 0 1 1 1.5 0V21A1.76 1.76 0 0 1 20 22.75z"
//                       data-original="#000000" />
//                     <path
//                       d="M15.5 22.75h-7a.76.76 0 0 1-.75-.75v-5a1.76 1.76 0 0 1 1.75-1.75h5A1.76 1.76 0 0 1 16.25 17v5a.76.76 0 0 1-.75.75zm-6.25-1.5h5.5V17a.25.25 0 0 0-.25-.25h-5a.25.25 0 0 0-.25.25z"
//                       data-original="#000000" />
//                   </g>
//                 </svg>
//                 Stores and Services
//               </li> */}
//               {/* <li className='max-md:hidden flex items-center text-[15px] max-lg:py-2 px-4 font-medium text-gray-800 cursor-pointer'>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 512 511">
//                   <path
//                     d="M497 193.3h-40.168c-1.215 0-2.418.052-3.613.13-9.024-8.051-19.004-14.7-29.68-19.82 24.348-17.294 40.262-45.712 40.262-77.778C463.8 43.266 421.035.5 368.469.5c-52.57 0-95.336 42.766-95.336 95.332 0 25.262 9.883 48.258 25.976 65.332h-70.148c16.094-17.074 25.973-40.07 25.973-65.332C254.934 43.266 212.168.5 159.602.5c-52.567 0-95.336 42.766-95.336 95.332 0 29.48 13.453 55.875 34.539 73.379-14.602 5.457-28.149 13.617-40.028 24.219a55.211 55.211 0 0 0-3.609-.13H15c-8.285 0-15 6.716-15 15v80.333c0 8.285 6.715 15 15 15h1.066v113.535c0 8.281 6.715 15 15 15h449.868c8.285 0 15-6.719 15-15V303.633H497c8.285 0 15-6.715 15-15V208.3c0-8.285-6.715-15-15-15zm-15 80.333h-25.168c-13.875 0-25.168-11.29-25.168-25.168 0-13.875 11.293-25.164 25.168-25.164H482zM303.133 95.832c0-36.023 29.308-65.332 65.332-65.332 36.023 0 65.336 29.309 65.336 65.332 0 36.027-29.309 65.332-65.332 65.332-36.028 0-65.336-29.305-65.336-65.332zM159.602 30.5c36.023 0 65.332 29.309 65.332 65.332 0 36.023-29.309 65.332-65.332 65.332-36.028 0-65.336-29.305-65.336-65.332 0-36.023 29.308-65.332 65.336-65.332zM30 223.3h25.168c13.875 0 25.168 11.29 25.168 25.169 0 13.875-11.293 25.164-25.168 25.164H30zm16.066 80.333h9.102c30.418 0 55.168-24.746 55.168-55.168 0-16.844-7.602-31.942-19.54-42.067h.356c15.504-9.918 33.535-15.23 52.383-15.23h142.887C258.664 214.566 241 249.574 241 288.633v113.535H110.332v-65.336c0-8.281-6.715-15-15-15-8.281 0-15 6.719-15 15v65.332H46.066zm419.868 98.531h-34.27v-65.332c0-8.281-6.715-15-15-15-8.281 0-15 6.719-15 15v65.332H271V288.633c0-53.742 43.723-97.465 97.469-97.465 18.933 0 37.039 5.36 52.582 15.36-11.852 10.128-19.383 25.163-19.383 41.94 0 30.419 24.746 55.165 55.168 55.165h9.098zm0 0"
//                     data-original="#000000" />
//                 </svg>
//                 Communty
//               </li> */}
//               {/* <li className='max-lg:py-2 px-4 cursor-pointer'>
//                 <span className="relative">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 inline" viewBox="0 0 512 512">
//                     <path
//                       d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
//                       data-original="#000000"></path>
//                   </svg>
//                   <span
//                     className="absolute left-auto -ml-1 -top-2 rounded-full bg-red-500 px-1 py-0 text-xs text-white">3</span>
//                 </span>
//               </li> */}
//              <li className='max-md:hidden flex items-center text-[15px] max-lg:py-2 px-4 font-medium text-gray-800 cursor-pointer' onClick={() => openModal('LocationDetectModal')}>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24">
//                   <g data-name="Layer 2">
//                     <path
//                       d="M12 2a10 10 0 1 0 10 10A10.012 10.012 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
//                       data-original="#000000" />
//                   </g>
//                 </svg>
//                 Detect Location
//               </li>
//               <li className='flex text-[15px] max-lg:py-2 px-4 hover:text-[#007bff] hover:fill-[#007bff]'>
//               <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" onClick={() => navigate("/login")}>
// <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent" >
// Login
// </span>
// </button>
//               </li>
//               <li className='flex text-[15px] max-lg:py-2 px-4 hover:text-[#007bff] hover:fill-[#007bff]'>
//               <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg  dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center  " onClick={() => navigate("/signup")}>Signup</button>
//               </li>
//               <li id="toggleOpen" className='lg:hidden'>
//                 <button>
//                   <svg className="w-7 h-7" fill="#333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path fillRule="evenodd"
//                       d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//                       clipRule="evenodd"></path>
//                   </svg>
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       <div id="collapseMenu"
//         className='max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'>
//         <button id="toggleClose" className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border'>
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
//             <path
//               d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
//               data-original="#000000"></path>
//             <path
//               d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
//               data-original="#000000"></path>
//           </svg>
//         </button>

//         <ul
//           className='lg:flex lg:flex-wrap lg:items-center lg:justify-center px-10 py-3 bg-[#333] min-h-[46px] gap-4 max-lg:space-y-4 max-lg:fixed max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-lg max-lg:overflow-auto z-50'>
//           <li className='mb-6 hidden max-lg:block'>
//             <a href="javascript:void(0)"><img src="https://readymadeui.com/readymadeui-white.svg" alt="logo" className='w-36' />
//             </a>
//           </li>
//           <li className='max-lg:border-b max-lg:py-3 px-3'><a href='javascript:void(0)'
//             className='hover:text-yellow-300 text-yellow-300 text-[15px] font-medium block'>Arts</a></li>
//           <li className='max-lg:border-b max-lg:py-3 px-3'><a href='javascript:void(0)'
//             className='hover:text-yellow-300 text-white text-[15px] font-medium block'>Music</a></li>
//           <li className='max-lg:border-b max-lg:py-3 px-3'><a href='javascript:void(0)'
//             className='hover:text-yellow-300 text-white text-[15px] font-medium block'>Sports</a></li>
//           <li className='max-lg:border-b max-lg:py-3 px-3'><a href='javascript:void(0)'
//             className='hover:text-yellow-300 text-white text-[15px] font-medium block'>Workshops</a></li>
//           <li className='max-lg:border-b max-lg:py-3 px-3'><a href='javascript:void(0)'
//             className='hover:text-yellow-300 text-white text-[15px] font-medium block'>Food</a></li>
//           <li className='max-lg:border-b max-lg:py-3 px-3'><a href='javascript:void(0)'
//             className='hover:text-yellow-300 text-white text-[15px] font-medium block'>Community</a></li>
//           <li className='max-lg:border-b max-lg:py-3 px-3'><a href='javascript:void(0)'
//             className='hover:text-yellow-300 text-white text-[15px] font-medium block'>Business</a></li>
//           <li className='max-lg:border-b max-lg:py-3 px-3'><a href='javascript:void(0)'
//             className='hover:text-yellow-300 text-white text-[15px] font-medium block'>Tech</a></li>
//           <li className='max-lg:border-b max-lg:py-3 px-3'><a href='javascript:void(0)'
//             className='hover:text-yellow-300 text-white text-[15px] font-medium block'>Festivals</a></li>
//           <li className='ml-auto'>  
//            <button type="button" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-bold text-l rounded-lg px-3 py-1 text-center "><Link to="eventOrganizer/addEvent">List Your Event</Link></button>
//               </li>
//         </ul>
        
//       </div>
//     </header>
//     </div>
//   )
// }

// export default HeaderPreLogin


import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Menu, 
  X, 
  ChevronDown, 
  Calendar, 
  Users, 
  Music, 
  Award,
  Coffee,
  Utensils,
  Briefcase,
  Cpu,
  Sparkles,
  Heart,
  Bell,
  Compass,
  TrendingUp,
  Star,
  Shuffle
} from 'lucide-react';

const HeaderPreLogin = () => {
  const [isLocationDetectModalOpen, setIsLocationDetectModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Arts');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Mock search suggestions
  const searchSuggestions = [
    "Music Festivals",
    "Art Exhibitions",
    "Tech Conferences",
    "Food Tasting Events",
    "Community Workshops"
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchSuggestions(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openModal = () => {
    setIsLocationDetectModalOpen(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowSearchSuggestions(false);
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleSearchFocus = () => {
    setShowSearchSuggestions(true);
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSearchSuggestions(false);
    navigate(`/search?q=${suggestion}`);
  };

  const categories = [
    { name: 'Arts', icon: <Award size={18} />, color: 'bg-purple-100 text-purple-600', gradient: 'from-purple-500 to-purple-700' },
    { name: 'Music', icon: <Music size={18} />, color: 'bg-pink-100 text-pink-600', gradient: 'from-pink-500 to-pink-700' },
    { name: 'Sports', icon: <Users size={18} />, color: 'bg-blue-100 text-blue-600', gradient: 'from-blue-500 to-blue-700' },
    { name: 'Workshops', icon: <Calendar size={18} />, color: 'bg-green-100 text-green-600', gradient: 'from-green-500 to-green-700' },
    { name: 'Food', icon: <Utensils size={18} />, color: 'bg-yellow-100 text-yellow-600', gradient: 'from-yellow-500 to-yellow-700' },
    { name: 'Community', icon: <Users size={18} />, color: 'bg-red-100 text-red-600', gradient: 'from-red-500 to-red-700' },
    { name: 'Business', icon: <Briefcase size={18} />, color: 'bg-indigo-100 text-indigo-600', gradient: 'from-indigo-500 to-indigo-700' },
    { name: 'Tech', icon: <Cpu size={18} />, color: 'bg-cyan-100 text-cyan-600', gradient: 'from-cyan-500 to-cyan-700' },
    { name: 'Festivals', icon: <Sparkles size={18} />, color: 'bg-amber-100 text-amber-600', gradient: 'from-amber-500 to-amber-700' },
    { name: 'Other', icon: <Shuffle size={18} />, color: 'bg-gray-100 text-gray-600', gradient: 'from-blue-700 to-blue-800' }

  ];

  return (
    <div>
      <header className={`font-sans tracking-wide fixed w-full top-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl bg-white/95 backdrop-blur-md' : 'bg-white shadow-lg'}`}>
        <section className='flex flex-wrap items-center justify-between relative py-3 lg:px-10 px-4 border-gray-200 border-b lg:min-h-[70px] max-lg:min-h-[60px]'>
          <Link to="/" className="shrink-0 flex items-center gap-2">
            <div className="relative w-15 h-15 sm:w-[50px] sm:h-[50px]">
              <img 
                // src="/logoFinal.png" 
                src='/community-engagement.png'
                alt="logo" 
                className='w-full h-full object-contain transition-transform hover:scale-110 duration-300' 
              />
            
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hidden sm:block">WedJoy</span>
              <span className="text-xs text-gray-500 hidden sm:block">Discover & Connect</span>
            </div>
          </Link>

          <div className='flex flex-wrap items-center flex-1 lg:mx-6'>
            <div className="relative lg:ml-6 max-md:w-full max-md:order-3 max-md:mt-3 md:flex-grow md:max-w-xl" ref={searchRef}>
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input 
                    type='text' 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={handleSearchFocus}
                    placeholder='Search for events, venues, categories...'
                    className='w-full bg-gray-100 border border-gray-200 focus:border-indigo-500 focus:bg-white px-4 rounded-full h-12 outline-none text-sm transition-all pl-10 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm' 
                  />
                  <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors">
                    <Search size={18} />
                  </button>
                </div>
                
                {/* Search suggestions dropdown */}
                {showSearchSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="p-2">
                      <div className="flex items-center pb-2 mb-1 border-b border-gray-100">
                        <TrendingUp size={14} className="text-gray-400 mr-2" />
                        <span className="text-xs font-medium text-gray-500">Trending Searches</span>
                      </div>
                      <ul>
                        {searchSuggestions.map((suggestion, index) => (
                          <li 
                            key={index}
                            className="px-3 py-2 hover:bg-gray-50 rounded-md cursor-pointer flex items-center text-sm text-gray-700"
                            onClick={() => handleSelectSuggestion(suggestion)}
                          >
                            <Search size={14} className="text-gray-400 mr-2" />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </form>
            </div>
            
            <div className="ml-auto max-md:ml-0 max-md:order-2">
              <ul className='flex items-center gap-1'>
                <li className='max-md:hidden flex items-center text-[15px] max-lg:py-2 px-3 font-medium text-gray-700 cursor-pointer hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50 group' onClick={openModal}>
                  <div className="relative">
                    <MapPin size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <span>Detect Location</span>
                </li>
                
                <li className='flex max-lg:py-2 px-2'>
                  <button 
                    className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden text-sm font-medium text-indigo-600 rounded-full group border border-indigo-300 hover:bg-indigo-50 transition-all duration-300 hover:shadow-sm"
                    onClick={() => navigate("/login")}
                  >
                    <span className="relative z-10">Login</span>
                    <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-indigo-50 to-blue-50 transition-all duration-300 group-hover:w-full"></div>
                  </button>
                </li>
                
                <li className='flex max-lg:py-2 px-2'>
                  <button 
                    type="button" 
                    className="text-white bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 shadow-md shadow-indigo-500/20 font-medium rounded-full text-sm px-6 py-2.5 text-center transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/40 hover:scale-105" 
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </button>
                </li>
                
                <li className='lg:hidden'>
                  <button 
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                  >
                    <Menu size={24} className="text-gray-700" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-600 rounded-full"></span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Desktop Navigation Menu */}
        <div className="lg:block max-lg:hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="container mx-auto">
            <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
              <ul className="flex items-center py-1 gap-1">
                {categories.map((category, index) => (
                  <li key={index} className="relative group flex-shrink-0">
                    <Link
                      to={`/category/${category.name.toLowerCase()}`}
                      className={`flex items-center px-4 py-2 text-sm font-medium hover:text-white transition-colors rounded-md ${category.name === activeCategory ? 'text-yellow-300' : 'text-gray-300'}`}
                      onClick={() => setActiveCategory(category.name)}
                    >
                      <span className={`flex items-center gap-1.5 relative ${category.name === activeCategory ? 'transform scale-105' : ''}`}>
                        <span className={`${category.name === activeCategory ? `p-1 rounded-full bg-gradient-to-r ${category.gradient}` : ''}`}>
                          {category.icon}
                        </span>
                        <span>{category.name}</span>
                        {category.name === activeCategory && (
                          <Star size={8} className="text-yellow-300 absolute -top-1 -right-2" />
                        )}
                      </span>
                    </Link>
                    <div className={`absolute h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-300 bottom-0 left-0 transition-all duration-300 ${category.name === activeCategory ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
                  </li>
                ))}
              </ul>
              
              <div className="ml-auto flex-shrink-0 pr-4">
                <Link
                  to="/eventOrganizer/manage-events"
                  className="text-gray-900 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 shadow-lg shadow-yellow-500/30 font-bold text-sm rounded-full px-5 py-2 text-center transition-all duration-300 hover:shadow-yellow-500/50 hover:scale-105 inline-flex items-center"
                >
                  <Sparkles size={16} className="mr-1" />
                  List Your Event
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - Modern Design */}
        <div className={`fixed inset-0 bg-black bg-opacity-60 z-50 lg:hidden backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className={`fixed top-0 left-0 w-4/5 max-w-xs h-full bg-white shadow-2xl overflow-auto z-50 transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <Link to="/" className="flex items-center gap-2">
                <img src="/diversity.png" alt="logo" className="w-10" />
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">WedJoy</span>
              </Link>
              <button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <X size={24} className="text-gray-700" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-6">
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative">
                    <input 
                      type='text' 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder='Search for events...'
                      className='w-full bg-gray-100 border border-gray-200 focus:border-indigo-500 px-4 rounded-lg h-11 outline-none text-sm pl-10 focus:ring-2 focus:ring-indigo-200 shadow-sm' 
                    />
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </div>
                </form>
              </div>
              
              <div onClick={openModal} className="flex items-center py-3 px-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg mb-5 cursor-pointer shadow-sm border border-indigo-100">
                <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                  <MapPin size={18} className="text-indigo-600" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-800">Detect my location</span>
                  <p className="text-xs text-gray-500">Find events near you</p>
                </div>
                <ChevronDown size={16} className="text-gray-400 ml-auto" />
              </div>
              
              <div className="bg-gray-50 p-3 rounded-xl mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">Trending Categories</h3>
                  <Link to="/categories" className="text-xs text-indigo-600 font-medium">View All</Link>
                </div>
                <ul className="grid grid-cols-2 gap-2">
                  {categories.slice(0, 6).map((category, index) => (
                    <li key={index}>
                      <Link
                        to={`/category/${category.name.toLowerCase()}`}
                        className={`flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all ${category.name === activeCategory ? 'bg-white shadow-sm border border-gray-100' : ''}`}
                        onClick={() => {
                          setActiveCategory(category.name);
                          setTimeout(() => toggleMenu(), 300);
                        }}
                      >
                        <span className={`p-1.5 rounded-full ${category.color}`}>
                          {category.icon}
                        </span>
                        <span className="font-medium text-sm text-gray-700">{category.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4 bg-gradient-to-r from-amber-50 to-yellow-50 p-3 rounded-xl border border-yellow-100">
                <h3 className="font-medium text-amber-800 mb-2 flex items-center">
                  <Compass size={16} className="mr-1.5" /> Explore
                </h3>
                <ul>
                  <li className="mb-1">
                    <Link to="/trending" className="text-sm text-gray-700 py-1.5 px-2 hover:bg-white rounded flex items-center" onClick={toggleMenu}>
                      <TrendingUp size={14} className="mr-2 text-amber-500" /> Trending Events
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link to="/popular" className="text-sm text-gray-700 py-1.5 px-2 hover:bg-white rounded flex items-center" onClick={toggleMenu}>
                      <Star size={14} className="mr-2 text-amber-500" /> Popular Near You
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-200 space-y-3">
                <button 
                  className="w-full py-2.5 px-4 rounded-lg border border-indigo-300 text-indigo-600 font-medium hover:bg-indigo-50 transition-colors flex justify-center items-center"
                  onClick={() => {
                    navigate("/login");
                    toggleMenu();
                  }}
                >
                  Login
                </button>
                
                <button 
                  className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-700 text-white font-medium hover:from-indigo-600 hover:to-blue-700 transition-colors shadow-md"
                  onClick={() => {
                    navigate("/signup");
                    toggleMenu();
                  }}
                >
                  Sign Up
                </button>
                
                <Link
                  to="/eventOrganizer/addEvent"
                  className=" w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-medium text-center hover:from-yellow-500 hover:to-yellow-600 transition-colors shadow-md flex items-center justify-center"
                  onClick={toggleMenu}
                >
                  <Sparkles size={16} className="mr-1.5" />
                  List Your Event
                </Link>
              </div>
            </div>
          </div>
          
          <div 
            className="fixed inset-0 z-40"
            onClick={toggleMenu}
          ></div>
        </div>
      </header>
      
      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-[120px] lg:h-[115px]"></div>
      
      {/* Location Detect Modal with premium design */}
      {isLocationDetectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-0 w-full max-w-md transform transition-all duration-300 scale-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-700 p-4 text-white">
              <h3 className="text-xl font-bold">Discover Events Near You</h3>
              <p className="text-indigo-100 text-sm mt-1">Enable location services for personalized experiences</p>
            </div>
            
            <div className="p-6">
              <div className="flex items-start mb-6">
                <div className="bg-indigo-100 p-3 rounded-full mr-4 mt-1">
                  <MapPin size={24} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Allow WedJoy to access your location to show you events happening nearby and get personalized recommendations.</p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 text-sm text-yellow-800">
                    Your privacy is important to us. We only use your location to enhance your experience.
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 justify-end">
                <button 
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  onClick={() => setIsLocationDetectModalOpen(false)}
                >
                  Not Now
                </button>
                <button 
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg hover:from-indigo-600 hover:to-blue-700 transition-colors shadow-md focus:ring-2 focus:ring-indigo-300 font-medium"
                  onClick={() => {
                    // Implement location detection logic
                    setTimeout(() => setIsLocationDetectModalOpen(false), 1000);
                  }}
                >
                  Allow Access
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderPreLogin;