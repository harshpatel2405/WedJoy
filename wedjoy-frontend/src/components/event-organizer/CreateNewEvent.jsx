import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';



const CreateNewEvent = () => {
  const baseURL=import.meta.env.VITE_API_URL;
  const [isOpen, setIsOpen] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      eventID: "",
      eventName: "",
      eventCategory: "",
      eventDescription: "",
      eventTags: "",
      eventType: "",
      ticketType: "",
      ticketPrice: "",
      totalTickets: "",
      organizerName: "",
      organizerContactEmail: "",
      organizerContactPhone: "",
      websiteLink: "",
      venueName: "",
      venuAddress: "",
      venueGoogleMapLink: "",
      ageRestrictions: false,
      accessibilityOptions: false,
      sponsors: false,
      refundPolicy: "",
      tnc: ""
    }
  });
  console.log("Errors", errors);

  const handleClose = () => {
    setIsOpen(false);
    // If you need to navigate back to a previous page
    // navigate('/events'); // Uncomment and adjust path as needed
  };
  // Convert Unix timestamps to readable date and time for display
  const unixToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toISOString().split('T')[0];
  };

  const unixToTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Convert dates back to Unix timestamps for submission
  const dateToUnix = (dateString) => {
    return Math.floor(new Date(dateString).getTime() / 1000);
  };

  // Convert time to seconds for submission
  const timeToSeconds = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60;
  };

  const submitHandler =async (data) => {
    console.log("Submitted Data", data);
    // Convert date strings to Unix timestamps
    const formattedData = {
      ...data,
      eventStartDate: dateToUnix(data.eventStartDate),
      eventEndDate: dateToUnix(data.eventEndDate),
      eventStartTime: timeToSeconds(data.eventStartTime),
      eventEndTime: timeToSeconds(data.eventEndTime),
      eventCreated: Math.floor(Date.now() / 1000)
    };
    
    console.log(" Formatted Data", formattedData);
    // Here you would send the data to your API

    const res=await axios.post(`${baseURL}/addEvent`, formattedData)
    console.log("Response", res.data);

    if(res?.status===201){
      console.log("Event Created Successfully", res.data);
    }
  };

  const [activeTab, setActiveTab] = useState('basicInfo');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-2xl font-bold">Create New Event</h2>
          <button 
            className="text-white hover:text-purple-200"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="p-6">
          {/* Tabs Navigation */}
          <div className="mb-6 flex border-b">
            <button 
              type="button"
              className={`px-4 py-2 font-medium ${activeTab === 'basicInfo' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('basicInfo')}
            >
              Basic Info
            </button>
            <button 
              type="button"
              className={`px-4 py-2 font-medium ${activeTab === 'venue' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('venue')}
            >
              Venue
            </button>
            <button 
              type="button"
              className={`px-4 py-2 font-medium ${activeTab === 'tickets' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('tickets')}
            >
              Tickets
            </button>
            <button 
              type="button"
              className={`px-4 py-2 font-medium ${activeTab === 'organizer' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('organizer')}
            >
              Organizer
            </button>
            <button 
              type="button"
              className={`px-4 py-2 font-medium ${activeTab === 'media' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('media')}
            >
              Media
            </button>
            <button 
              type="button"
              className={`px-4 py-2 font-medium ${activeTab === 'additional' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('additional')}
            >
              Additional
            </button>
          </div>

          {/* Basic Info Tab */}
          <div className={activeTab === 'basicInfo' ? 'block' : 'hidden'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Event ID</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 bg-gray-50"
                  {...register("eventID", { required: "Event ID is required" })}
                />
                {errors.eventID && <p className="text-red-500 text-sm mt-1">{errors.eventID.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Event Name</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                  {...register("eventName", { required: "Event name is required" })}
                />
                {errors.eventName && <p className="text-red-500 text-sm mt-1">{errors.eventName.message}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Event Category</label>
              <select 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                {...register("eventCategory", { required: "Event category is required" })}
              >
                <option value="Sports">Sports</option>
                <option value="Music">Music</option>
                <option value="Arts">Arts</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
              {errors.eventCategory && <p className="text-red-500 text-sm mt-1">{errors.eventCategory.message}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Event Description</label>
              <textarea 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 h-32"
                {...register("eventDescription", { required: "Event description is required" })}
              ></textarea>
              {errors.eventDescription && <p className="text-red-500 text-sm mt-1">{errors.eventDescription.message}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Event Tags (comma separated)</label>
              <input 
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                {...register("eventTags")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Start Date</label>
                <input 
                  type="date"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                  defaultValue={unixToDate(1754467200)}
                  {...register("eventStartDate", { required: "Start date is required" })}
                />
                {errors.eventStartDate && <p className="text-red-500 text-sm mt-1">{errors.eventStartDate.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">End Date</label>
                <input 
                  type="date"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                  defaultValue={unixToDate(1755475200)}
                  {...register("eventEndDate", { required: "End date is required" })}
                />
                {errors.eventEndDate && <p className="text-red-500 text-sm mt-1">{errors.eventEndDate.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Start Time</label>
                <input 
                  type="time"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                  defaultValue={unixToTime(57600)}
                  {...register("eventStartTime", { required: "Start time is required" })}
                />
                {errors.eventStartTime && <p className="text-red-500 text-sm mt-1">{errors.eventStartTime.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">End Time</label>
                <input 
                  type="time"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                  defaultValue={unixToTime(75600)}
                  {...register("eventEndTime", { required: "End time is required" })}
                />
                {errors.eventEndTime && <p className="text-red-500 text-sm mt-1">{errors.eventEndTime.message}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Event Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    value="online" 
                    className="mr-2 text-purple-600 focus:ring-purple-300"
                    {...register("eventType")}
                  />
                  Online
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    value="offline" 
                    className="mr-2 text-purple-600 focus:ring-purple-300"
                    {...register("eventType")}
                  />
                  Offline
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    value="hybrid" 
                    className="mr-2 text-purple-600 focus:ring-purple-300"
                    {...register("eventType")}
                  />
                  Hybrid
                </label>
              </div>
            </div>
          </div>

          {/* Venue Tab */}
          <div className={activeTab === 'venue' ? 'block' : 'hidden'}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Venue Name</label>
              <input 
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                {...register("venueName")}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Venue Address</label>
              <textarea 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                {...register("venuAddress")}
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Google Maps Link</label>
              <input 
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                {...register("venueGoogleMapLink")}
              />
            </div>
          </div>

          {/* Tickets Tab */}
          <div className={activeTab === 'tickets' ? 'block' : 'hidden'}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Ticket Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    value="free" 
                    className="mr-2 text-purple-600 focus:ring-purple-300"
                    {...register("ticketType")}
                  />
                  Free
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    value="paid" 
                    className="mr-2 text-purple-600 focus:ring-purple-300"
                    {...register("ticketType")}
                  />
                  Paid
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Ticket Price ($)</label>
                <input 
                  type="number"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                  {...register("ticketPrice", { valueAsNumber: true })}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Total Tickets</label>
                <input 
                  type="number"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                  {...register("totalTickets", { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>

          {/* Organizer Tab */}
          <div className={activeTab === 'organizer' ? 'block' : 'hidden'}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Organizer Name</label>
              <input 
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                {...register("organizerName")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Contact Email</label>
                <input 
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                  {...register("organizerContactEmail", { 
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.organizerContactEmail && <p className="text-red-500 text-sm mt-1">{errors.organizerContactEmail.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Contact Phone</label>
                <input 
                  type="tel"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                  {...register("organizerContactPhone", { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Website Link</label>
              <input 
                type="url"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                {...register("websiteLink")}
              />
            </div>
          </div>

          {/* Media Tab */}
          <div className={activeTab === 'media' ? 'block' : 'hidden'}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Event Banner Image URL</label>
              <input 
                type="url"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                {...register("eventBannerImage")}
              />
              {errors.eventBannerImage && <p className="text-red-500 text-sm mt-1">{errors.eventBannerImage.message}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Gallery Image URLs (comma separated)</label>
              <input 
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                {...register("gallery")}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Promo Video URL</label>
              <input 
                type="url"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                {...register("promoVideo")}
              />
            </div>
          </div>

          {/* Additional Tab */}
          <div className={activeTab === 'additional' ? 'block' : 'hidden'}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center">
                <input 
                  type="checkbox"
                  className="mr-2 h-5 w-5 text-purple-600 focus:ring-purple-300"
                  {...register("ageRestrictions")}
                />
                <label className="text-gray-700 font-medium">Age Restrictions</label>
              </div>

              <div className="flex items-center">
                <input 
                  type="checkbox"
                  className="mr-2 h-5 w-5 text-purple-600 focus:ring-purple-300"
                  {...register("accessibilityOptions")}
                />
                <label className="text-gray-700 font-medium">Accessibility Options</label>
              </div>

              <div className="flex items-center">
                <input 
                  type="checkbox"
                  className="mr-2 h-5 w-5 text-purple-600 focus:ring-purple-300"
                  {...register("sponsors")}
                />
                <label className="text-gray-700 font-medium">Sponsors</label>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Refund Policy</label>
              <textarea 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                {...register("refundPolicy")}
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Terms & Conditions</label>
              <textarea 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                {...register("tnc")}
              ></textarea>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t mt-8">
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            
            <div className="flex gap-4">
              <button
                type="button"
                className="px-6 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                Create Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewEvent;