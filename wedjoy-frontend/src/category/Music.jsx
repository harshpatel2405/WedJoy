// import React, { useState } from "react";
// import { Link, useParams } from "react-router-dom";

// const Music = () => {
//   const { category } = useParams();
//   const [visibleEvents, setVisibleEvents] = useState(30);

//   const mockEvents = Array.from({ length: 50 }, (_, index) => ({
//     id: index + 1,
//     name: `Music Event ${index + 1}`,
//     category: `Category ${index % 5 + 1}`,
//     date: `2025-05-${(index % 30) + 1}`,
//     price: `$${(index % 50) + 10}`,
//     guests: [`Guest ${index + 1}`, `DJ ${index + 2}`],
//     image: `https://picsum.photos/800/500?random=${index + 1}`,
//     details: "An amazing music experience awaits you!",
//   }));

//   const filteredEvents =
//     !category || category.toLowerCase() === "music"
//       ? mockEvents
//       : mockEvents.filter((event) => event.category === category);

//   if (filteredEvents.length === 0) {
//     return (
//       <div className="p-8 bg-gradient-to-br from-purple-700 to-indigo-900 min-h-screen flex items-center justify-center text-white">
//         <h1 className="text-5xl font-extrabold text-center">
//           No events found for <span className="underline">{category}</span>
//         </h1>
//       </div>
//     );
//   }

//   const loadMore = () => {
//     setVisibleEvents((prev) => Math.min(prev + 30, filteredEvents.length));
//   };

//   return (
//     <div className="p-8 bg-gradient-to-br from-purple-700 to-indigo-900 min-h-screen text-white">
//       <h1 className="text-5xl font-extrabold text-center mb-10 drop-shadow-lg">
//         🎵 Upcoming {category ? category : "Music"} Events 🎶
//       </h1>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {filteredEvents.slice(0, visibleEvents).map((event) => (
//           <div
//             key={event.id}
//             className="bg-white text-gray-900 rounded-xl shadow-2xl p-6 transition transform hover:scale-105 hover:shadow-3xl"
//           >
//             <img
//               src={event.image}
//               alt={event.name}
//               className="w-full h-56 object-cover rounded-lg"
//             />
//             <h2 className="text-2xl font-bold mt-5">{event.name}</h2>
//             <p className="text-gray-600 text-lg">📅 {event.date}</p>
//             <p className="text-green-600 font-bold text-lg">💰 {event.price}</p>
//             <p className="text-gray-700 text-md">
//               🎤 Special Guests: {event.guests.join(", ")}
//             </p>
//             <p className="mt-3 text-gray-600 text-md">{event.details}</p>

//             {/* Corrected Link for Get Details */}
//             <Link
//               to={`/getDetails/${event.name}`}
//               className="mt-4 block text-center w-full py-3 bg-gradient-to-r from-pink-500 to-purple-700 text-white font-extrabold text-lg rounded-full shadow-lg shadow-purple-500
//                 hover:shadow-2xl hover:shadow-pink-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
//             >
//               🎧 Get Details 🎶
//             </Link>
//           </div>
//         ))}
//       </div>
//       {visibleEvents < filteredEvents.length && (
//         <div className="flex justify-center mt-10">
//           <button
//             className="px-6 py-3 bg-yellow-500 text-gray-900 font-bold text-lg rounded-full shadow-lg hover:bg-yellow-600 transition"
//             onClick={loadMore}
//           >
//             Load More
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Music;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const EventsPage = () => {
  const { category } = useParams();
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalEvents, setTotalEvents] = useState(0);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:1999/category/${category}?page=${page}&limit=15`
      );
      const data = await response.json();
      
      if (page === 1) {
        setEvents(data.events);
      } else {
        setEvents(prev => [...prev, ...data.events]);
      }
      
      setHasMore(data.pagination?.hasMore || false);
      setTotalEvents(data.pagination?.totalEvents || 0);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset and fetch when category changes
  useEffect(() => {
    setPage(1);
    setEvents([]);
  }, [category]);

  // Fetch events when page or category changes
  useEffect(() => {
    fetchEvents();
  }, [page, category]);

  const loadMore = () => {
    setPage(prev => prev + 1);
    // Smooth scroll to maintain position
    window.scrollBy({
      top: 300,
      behavior: "smooth"
    });
  };

  if (events.length === 0 && !isLoading) {
    return (
      <div className="p-8 min-h-screen flex items-center justify-center text-[#2A3D66] bg-gradient-to-br from-[#DDE7EE] to-[#F8F9FA]">
        <h1 className="text-5xl font-extrabold text-center">
          No events found for{" "}
          <span className="text-[#6C8AA8] underline">{category}</span>
        </h1>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen text-[#2A3D66] bg-gradient-to-br from-[#DDE7EE] to-[#F8F9FA]">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 md:mb-10 drop-shadow-lg text-[#4A6FA5]">
        {category ? `✨ ${category} Events 🎭` : "✨ Discover All Events 🎟️🎉"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-[#FDFDFD] text-[#2A3D66] rounded-xl shadow-lg p-4 md:p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#C0C0C0]/50"
          >
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-48 md:h-56 object-cover rounded-lg"
              loading="lazy"
            />
            <div className="mt-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#6C8AA8] line-clamp-1">
                {event.name}
              </h2>
              <p className="text-[#2A3D66] text-sm md:text-base flex items-center mt-2">
                <span className="mr-2">📅</span> {event.date}
              </p>
              <p className="text-[#6C8AA8] font-bold text-sm md:text-base flex items-center mt-1">
                <span className="mr-2">💰</span> {event.price}
              </p>
              <p className="text-[#2A3D66] text-xs md:text-sm line-clamp-1 mt-2">
                <span className="mr-2">🎤</span> Guests:{" "}
                {event.guests?.join(", ") || "Not specified"}
              </p>
              <p className="mt-3 text-[#6C8AA8] text-xs md:text-sm line-clamp-2">
                {event.details}
              </p>
              <Link
                to={`/getDetails/${event.id}`}
                className="mt-4 w-full py-2 md:py-3 bg-gradient-to-r from-[#8EA9C1] to-[#6C8AA8] text-[#FDFDFD] font-bold md:font-extrabold text-sm md:text-base rounded-full shadow-lg hover:shadow-xl hover:shadow-[#C0C0C0]/50 transition-all duration-300 transform hover:scale-[1.03] active:scale-95 hover:text-white flex justify-center items-center"
              >
                Get Details →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8 md:mt-10">
          <button
            className="px-6 py-3 bg-[#8EA9C1] text-[#FDFDFD] font-bold text-lg rounded-full shadow-lg hover:bg-[#6C8AA8] transition flex items-center"
            onClick={loadMore}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : (
              "Load More Events"
            )}
          </button>
        </div>
      )}

      {!hasMore && events.length > 0 && (
        <div className="text-center mt-8 text-[#6C8AA8] font-medium">
          {totalEvents > 0 ? (
            <>Showing all {totalEvents} events for this category</>
          ) : (
            "You've reached the end of events"
          )}
        </div>
      )}
    </div>
  );
};

export default EventsPage;