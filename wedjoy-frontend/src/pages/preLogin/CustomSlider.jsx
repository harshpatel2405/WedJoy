import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Calendar, MapPin, Users, Star, Ticket, Award, Heart, Share2, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const CustomSlider = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(2); // Start with the center card
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  }, [slides.length]);

  // Auto-play functionality
  useEffect(() => {
    if (isHovered) return; // Pause auto-play when hovered

    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [handleNext, isHovered]);

  // If slides are empty, show a loading state
  if (slides.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden py-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slider Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(calc(50% - ${currentIndex * 20}%))`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`flex-shrink-0 w-1/5 px-4 transition-all duration-300 ${
              index === currentIndex
                ? "scale-110 z-10" // Center card is larger and on top
                : index >= currentIndex - 2 && index <= currentIndex + 2
                ? "scale-90 opacity-75" // Side cards are smaller and semi-transparent
                : "hidden" // Hide cards outside the visible range
            }`}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200";
                  }}
                />
                <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {slide.category}
                </div>
                {slide.vipAvailable && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md">
                    <Award size={12} className="mr-1" /> VIP
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-16"></div>
                <div className="absolute bottom-2 left-4 flex items-center">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs ml-1 font-medium">
                    {slide.rating}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 hover:text-indigo-600 transition-colors">
                  {slide.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {slide.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar size={16} className="mr-2 text-indigo-500" />
                    <span>
                      {new Date(slide.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin size={16} className="mr-2 text-indigo-500" />
                    <span>{slide.location}</span>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm">
                    <Users size={16} className="mr-2 text-indigo-500" />
                    <span>{slide.attendees} attending</span>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm">
                    <DollarSign size={16} className="mr-2 text-indigo-500" />
                    <span>From {slide.price}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className="flex-grow py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-indigo-200"
                    aria-label="Get Tickets"
                  >
                    <Ticket size={16} className="mr-2" />
                    <span>Get Tickets</span>
                  </button>

                  <button
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors hover:text-pink-500"
                    aria-label="Add to Favorites"
                  >
                    <Heart size={18} />
                  </button>

                  <button
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors hover:text-indigo-500"
                    aria-label="Share Event"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300"
        aria-label="Previous Slide"
      >
        <ArrowLeft size={24} className="text-indigo-600" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300"
        aria-label="Next Slide"
      >
        <ArrowRight size={24} className="text-indigo-600" />
      </button>
    </div>
  );
};

export default React.memo(CustomSlider);