import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, Users, Star, Clock, Ticket, Award, TrendingUp} from "lucide-react";
import CustomSlider from "./CustomSlider";
import Footer from "../../components/layouts/Footer";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [trendingEvents, setTrendingEvents] = useState([]);
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch main event data
    const fetchMainEvents = fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        // Transform the data to match our slide structure
        const formattedSlides = data.slice(0, 12).map((post, index) => ({
          id: post.id,
          title: `${["Ultimate Music Festival", "International Art Exhibition", "Gourmet Food Tasting", "Tech Innovation Conference", 
                    "Annual Charity Gala", "Championship Sports Tournament", "Exclusive Film Premiere", "Master Skills Workshop",
                    "Fashion Week Showcase", "Literary Festival", "Comedy Night Special", "Cultural Heritage Exhibition"][index]}`,
          description: post.body.substring(0, 120) + "...", // Extended description length
          image: `https://picsum.photos/800/500?random=${index + 1}`,
          date: `2023-${Math.floor(index/3) + 10}-${15 + (index % 28)}`,
          location: `${["New York", "Los Angeles", "Chicago", "Miami", "Seattle", "Austin", "Boston", "San Francisco", 
                       "Denver", "Nashville", "Atlanta", "Dallas"][index]}`,
          category: `${["Music", "Art", "Food", "Technology", "Charity", "Sports", "Entertainment", "Education", 
                       "Fashion", "Literature", "Comedy", "Culture"][index]}`,
          price: `$${Math.floor(Math.random() * 150) + 50}`,
          attendees: Math.floor(Math.random() * 500) + 100,
          rating: (Math.random() * 2 + 3).toFixed(1),
          buttonText: "Join Event",
          featured: index < 4,
          vipAvailable: index % 3 === 0,
          earlyBirdDeadline: `2023-${Math.floor(index/3) + 9}-${28 - (index % 20)}`
        }));
        return formattedSlides;
      });

    // Fetch trending events data
    const fetchTrendingEvents = fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const trendingData = data.slice(0, 6).map((user, index) => ({
          id: user.id,
          title: `${["Summer Beach Party", "Jazz Night", "Weekend Market", "Mountain Hike", "Wine Tasting", "Startup Pitch Night"][index]}`,
          image: `https://picsum.photos/400/300?random=${index + 20}`,
          date: `2023-11-${index + 5}`,
          location: user.address.city,
          attendees: Math.floor(Math.random() * 300) + 50,
          trending: Math.floor(Math.random() * 50) + 10,
        }));
        return trendingData;
      });

    // Fetch featured artists/speakers
    const fetchFeaturedArtists = fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const artistsData = data.map((user, index) => ({
          id: user.id,
          name: user.name,
          profession: `${["DJ", "Artist", "Chef", "Tech Speaker", "Philanthropist", "Athlete", "Director", "Educator", "Designer", "Author"][index % 10]}`,
          image: `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 10}.jpg`,
          events: Math.floor(Math.random() * 10) + 2,
          rating: (Math.random() * 1 + 4).toFixed(1),
        }));
        return artistsData;
      });

    // Fetch testimonials
    const fetchTestimonials = fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((data) => {
        const testimonialsData = data.slice(0, 5).map((comment, index) => ({
          id: comment.id,
          name: comment.name.split(' ').slice(0, 2).join(' '),
          text: comment.body,
          image: `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${index + 30}.jpg`,
          rating: Math.floor(Math.random() * 2) + 4,
          eventAttended: `${["Music Festival", "Art Exhibition", "Food Tasting", "Tech Conference", "Charity Gala"][index]}`,
        }));
        return testimonialsData;
      });

    // Platform statistics
    const generateStats = new Promise((resolve) => {
      resolve({
        totalEvents: 1240,
        totalUsers: 58700,
        totalTicketsSold: 246800,
        totalOrganizers: 840,
        totalRevenue: "12.4M",
        totalCities: 86,
        satisfactionRate: 96,
        repeatBookingRate: 78
      });
    });

    // Wait for all data to be fetched
    Promise.all([fetchMainEvents, fetchTrendingEvents, fetchFeaturedArtists, fetchTestimonials, generateStats])
      .then(([mainEvents, trendingData, artistsData, testimonialsData, statsData]) => {
        setSlides(mainEvents);
        setTrendingEvents(trendingData);
        setFeaturedArtists(artistsData);
        setTestimonials(testimonialsData);
        setStats(statsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white py-20">
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pattern" patternUnits="userSpaceOnUse" width="80" height="80" patternTransform="rotate(45)">
                <rect width="80" height="80" fill="none" />
                <circle cx="40" cy="40" r="10" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                Discover Extraordinary Events
              </span>
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mb-10 animate-fade-in-delay">
              Join thousands of people in the most exciting and exclusive events happening around you. Live the experience!
            </p>
            
            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 w-full max-w-4xl">
              {[
                { value: stats.totalEvents?.toLocaleString() || '1,200+', label: 'Events' },
                { value: stats.totalUsers?.toLocaleString() || '50K+', label: 'Members' },
                { value: stats.totalCities?.toLocaleString() || '80+', label: 'Cities' },
                { value: `${stats.satisfactionRate || 95}%`, label: 'Satisfaction' },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center p-4 backdrop-blur-sm bg-white/10 rounded-xl">
                  <span className="text-3xl font-bold text-white">{stat.value}</span>
                  <span className="text-indigo-200 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
            
            {/* Navigation Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
              <Link to="/eventOrganizerSignup" className="w-full">
                <button className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 border border-purple-500/30">
                  <span className="text-lg">Event Organizer Signup</span>
                  <ArrowRight size={20} />
                </button>
              </Link>
              
              <Link to="/businessOwnerSignup" className="w-full">
                <button className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 border border-emerald-500/30">
                  <span className="text-lg">Business Owner Signup</span>
                  <ArrowRight size={20} />
                </button>
              </Link>
              
              <Link to="/userSignup" className="w-full">
                <button className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 border border-emerald-500/30">
                  <span className="text-lg">User Signup</span>
                  <ArrowRight size={20} />
                </button>
              </Link>

              <div className="dropdown w-full relative group">
                <button className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-amber-500/30">
                  <span className="text-lg">Dashboards</span>
                </button>
                <div className="dropdown-content hidden group-hover:block absolute z-10 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden w-64 animate-fade-in transition-all duration-300">
                  <Link to="/admin" className="block py-3 px-6 hover:bg-gray-100 text-gray-800 font-medium transition-colors">
                    Admin Dashboard
                  </Link>
                  <Link to="/eventOrganizer" className="block py-3 px-6 hover:bg-gray-100 text-gray-800 font-medium transition-colors">
                    Event Organizer Dashboard
                  </Link>
                  <Link to="/admin" className="block py-3 px-6 hover:bg-gray-100 text-gray-800 font-medium transition-colors">
                    Business Owner Dashboard
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="w-full max-w-4xl mt-12 relative">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <input 
                    type="text" 
                    placeholder="Search for events, artists, or venues..." 
                    className="w-full py-4 px-6 bg-white text-gray-800 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                </div>
                <button className="py-4 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-indigo-500/30">
                  Find Events
                </button>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 cursor-pointer transition-colors backdrop-blur-sm">
                  #Music
                </span>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 cursor-pointer transition-colors backdrop-blur-sm">
                  #ThisWeekend
                </span>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 cursor-pointer transition-colors backdrop-blur-sm">
                  #FreeEvents
                </span>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 cursor-pointer transition-colors backdrop-blur-sm">
                  #NearMe
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Events Slider */}
        <div className="mb-20">
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
      Featured <span className="text-indigo-600">Events</span>
    </h2>
    <Link
      to="/events"
      className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center group transition-all duration-300"
    >
      View all events
      <ArrowRight size={18} className="ml-1 group-hover:ml-2 transition-all duration-300" />
    </Link>
  </div>

  {loading ? (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  ) : (
    <CustomSlider slides={slides.filter((slide) => slide.featured)} />
  )}
</div>
        {/* Trending Now Section */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              <span className="text-rose-600">Trending</span> Now
            </h2>
            <Link to="/trending" className="text-rose-600 hover:text-rose-800 font-medium flex items-center">
              See all trending <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md h-32 animate-pulse"></div>
              ))
            ) : (
              trendingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden flex h-32 hover:shadow-lg transition-all duration-300">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-32 h-32 object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/100x100";
                    }}
                  />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{event.title}</h3>
                      <div className="flex items-center text-gray-500 text-xs">
                        <Calendar size={12} className="mr-1" /> 
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex items-center text-gray-500 text-xs mt-1">
                        <MapPin size={12} className="mr-1" /> {event.location}
                      </div>
                    </div>
                    <div className="flex items-center text-rose-600 text-sm font-medium">
                      <TrendingUp size={14} className="mr-1" /> {event.trending}% increase in bookings
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Featured Categories */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Explore by <span className="text-indigo-600">Category</span>
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              {name: "Music", icon: "🎵"}, 
              {name: "Sports", icon: "⚽"}, 
              {name: "Art", icon: "🎨"}, 
              {name: "Food", icon: "🍽️"}, 
              {name: "Technology", icon: "💻"}, 
              {name: "Education", icon: "📚"}, 
              {name: "Business", icon: "💼"}, 
              {name: "Entertainment", icon: "🎭"}
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full text-2xl">
                  {category.icon}
                </div>
                <h3 className="font-medium text-gray-800 text-center">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
        
        {/* All Events */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Upcoming <span className="text-indigo-600">Events</span>
            </h2>
            
            <div className="flex space-x-2">
              <button className="py-2 px-4 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors text-sm font-medium">
                Newest
              </button>
              <button className="py-2 px-4 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium">
                Popular
              </button>
              <button className="py-2 px-4 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium">
                This Week
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(8).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md h-80 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {slides.slice(0, 8).map((slide) => (
                <div key={slide.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200";
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {slide.category}
                    </div>
                    {new Date(slide.earlyBirdDeadline) > new Date() && (
                      <div className="absolute bottom-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                        <Clock size={12} className="mr-1" /> Early Bird
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                        {slide.title}
                      </h3>
                      <div className="flex items-center bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs font-medium">
                        <Star size={12} className="mr-1 text-yellow-500" /> {slide.rating}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar size={14} className="mr-2 text-indigo-500" />
                        <span>{new Date(slide.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin size={14} className="mr-2 text-indigo-500" />
                        <span>{slide.location}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Users size={14} className="mr-2 text-indigo-500" />
                          <span>{slide.attendees} going</span>
                        </div>
                        
                        <div className="text-indigo-600 font-bold">
                          {slide.price}
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center">
                      <Ticket size={16} className="mr-2" />
                      <span>Get Tickets</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-center mt-10">
            <button className="py-3 px-8 bg-indigo-50 text-indigo-600 font-medium rounded-lg hover:bg-indigo-100 transition-all duration-300 flex items-center justify-center">
              <span>Load More Events</span>
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
        
        {/* Featured Artists/Speakers */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Featured <span className="text-indigo-600">Artists & Speakers</span>
          </h2>
          
          {loading ? (
            <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
          ) : (
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              pagination={{ clickable: true }}
              navigation={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              spaceBetween={20}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 3, spaceBetween: 20 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                1024: { slidesPerView: 5, spaceBetween: 20 },
                1280: { slidesPerView: 6, spaceBetween: 20 },
              }}
              className="py-10 px-2"
            >
              {featuredArtists.map((artist) => (
                <SwiperSlide key={artist.id}>
                  <div className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative inline-block mb-3">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-indigo-100"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/100x100";
                        }}
                      />
                      <div className="absolute bottom-0 right-0 bg-indigo-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                        {artist.rating}
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1">{artist.name}</h3>
                    <p className="text-indigo-600 text-sm font-medium mb-2">{artist.profession}</p>
                    <p className="text-gray-500 text-xs">{artist.events} upcoming events</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        
        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            What Our <span className="text-indigo-600">Users Say</span>
          </h2>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <Swiper
              modules={[Pagination, Autoplay, EffectFade]}
              effect="fade"
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              spaceBetween={0}
              slidesPerView={1}
              className="max-w-4xl mx-auto"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="bg-white rounded-2xl shadow-lg p-8 text-center relative">
                    <div className="absolute top-0 transform -translate-y-1/2 left-1/2 -translate-x-1/2">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80x80";
                        }}
                      />
                    </div>
                    
                    <div className="mt-10">
                      <div className="flex justify-center mb-4">
                        {Array(testimonial.rating).fill(0).map((_, index) => (
                          <Star key={index} size={20} className="text-yellow-500 fill-current" />
                        ))}
                        {Array(5 - testimonial.rating).fill(0).map((_, index) => (
                          <Star key={index} size={20} className="text-gray-300" />
                        ))}
                      </div>
                      
                      <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                      
                      <div className="space-y-1">
                        <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                        <p className="text-indigo-600 text-sm">Attended: {testimonial.eventAttended}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        
        {/* Platform Statistics */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Our <span className="text-indigo-600">Platform</span> in Numbers
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Ticket, value: stats.totalTicketsSold?.toLocaleString() || '240,000+', label: 'Tickets Sold' },
              { icon: Users, value: stats.totalUsers?.toLocaleString() || '58,000+', label: 'Active Users' },
              { icon: MapPin, value: stats.totalCities?.toLocaleString() || '86', label: 'Cities Covered' },
              { icon: Award, value: `$${stats.totalRevenue || '12M'}+`, label: 'Total Revenue' },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-indigo-100 rounded-full">
                  <stat.icon size={32} className="text-indigo-600" />
                </div>
                <span className="block text-3xl font-bold text-gray-800 mb-1">{stat.value}</span>
                <span className="text-gray-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-xl mb-20">
          <div className="absolute right-0 bottom-0 opacity-20">
            <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="200" fill="white" />
              <circle cx="200" cy="200" r="150" fill="transparent" stroke="white" strokeWidth="40" />
              <circle cx="200" cy="200" r="100" fill="white" />
            </svg>
          </div>
          
          <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start Creating Your Own Events
              </h2>
              <p className="text-indigo-100 text-lg max-w-xl">
                Join thousands of event organizers who are successfully hosting and managing events with our platform.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="py-4 px-8 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Get Started
              </button>
              <button className="py-4 px-8 bg-transparent text-white font-bold rounded-xl border-2 border-white hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:-translate-y-1">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter to get the latest updates on events and exclusive offers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow py-3 px-6 bg-gray-100 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="py-3 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer/>
{/* Add custom styles */}
<style jsx>{`
  .group:hover .dropdown-content {
    display: block;
  }
  .swiper-pagination-bullet-active-custom {
  background-color: #4f46e5; /* bg-indigo-600 */
  transform: scale(1.25); /* scale-125 */
}
  .swiper-pagination-bullet-custom {
  background-color: #d1d5db; /* bg-gray-300 */
  transition: all 0.3s ease; /* transition-all duration-300 */
}
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.8s ease-out forwards;
  }
  
  .animate-fade-in-delay {
    animation: fade-in 0.8s ease-out 0.3s forwards;
    opacity: 0;
  }
`}</style>
    </div>
  );
};

export default Home;