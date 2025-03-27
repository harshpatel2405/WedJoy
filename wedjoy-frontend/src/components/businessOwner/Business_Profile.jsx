// import React, { useState } from 'react';

// const Business_Profile = () => {
//   const [formData, setFormData] = useState({
//     businessCategory: '',
//     businessDescription: '',
//     location: {
//       city: '',
//       area: '',
//       address: ''
//     },
//     logo: null,
//     coverImage: null,
//     operatingHours: [
//       { day: 'Monday', open: '09:00', close: '17:00', closed: false },
//       { day: 'Tuesday', open: '09:00', close: '17:00', closed: false },
//       { day: 'Wednesday', open: '09:00', close: '17:00', closed: false },
//       { day: 'Thursday', open: '09:00', close: '17:00', closed: false },
//       { day: 'Friday', open: '09:00', close: '17:00', closed: false },
//       { day: 'Saturday', open: '10:00', close: '15:00', closed: false },
//       { day: 'Sunday', open: '10:00', close: '15:00', closed: true }
//     ],
//     servicesOffered: [{ name: '', description: '' }],
//     pricingRange: {
//       min: '',
//       max: '',
//       currency: 'USD'
//     },
//     paymentMethods: {
//       cash: false,
//       creditCard: false,
//       bankTransfer: false,
//       paypal: false,
//       other: ''
//     },
//     socialMedia: {
//       facebook: '',
//       instagram: '',
//       twitter: '',
//       linkedin: '',
//       other: ''
//     }
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleLocationChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       location: {
//         ...formData.location,
//         [name]: value
//       }
//     });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files[0]
//     });
//   };

//   const handleOperatingHoursChange = (index, field, value) => {
//     const updatedHours = [...formData.operatingHours];
//     if (field === 'closed') {
//       updatedHours[index].closed = !updatedHours[index].closed;
//     } else {
//       updatedHours[index][field] = value;
//     }
//     setFormData({
//       ...formData,
//       operatingHours: updatedHours
//     });
//   };

//   const handleServiceChange = (index, field, value) => {
//     const updatedServices = [...formData.servicesOffered];
//     updatedServices[index][field] = value;
//     setFormData({
//       ...formData,
//       servicesOffered: updatedServices
//     });
//   };

//   const addService = () => {
//     setFormData({
//       ...formData,
//       servicesOffered: [...formData.servicesOffered, { name: '', description: '' }]
//     });
//   };

//   const removeService = (index) => {
//     const updatedServices = [...formData.servicesOffered];
//     updatedServices.splice(index, 1);
//     setFormData({
//       ...formData,
//       servicesOffered: updatedServices
//     });
//   };

//   const handlePricingChange = (field, value) => {
//     setFormData({
//       ...formData,
//       pricingRange: {
//         ...formData.pricingRange,
//         [field]: value
//       }
//     });
//   };

//   const handlePaymentMethodChange = (method) => {
//     setFormData({
//       ...formData,
//       paymentMethods: {
//         ...formData.paymentMethods,
//         [method]: !formData.paymentMethods[method]
//       }
//     });
//   };

//   const handleSocialMediaChange = (platform, value) => {
//     setFormData({
//       ...formData,
//       socialMedia: {
//         ...formData.socialMedia,
//         [platform]: value
//       }
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Data:', formData);
//     // Here you would typically send the data to your backend
//     alert('Profile updated successfully!');
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">Business Profile</h1>
        
//         <form onSubmit={handleSubmit}>
//           {/* Business Category */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">Business Category</h2>
//             <select
//               name="businessCategory"
//               value={formData.businessCategory}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select a category</option>
//               <option value="Catering">Catering</option>
//               <option value="Décor">Décor</option>
//               <option value="Photography">Photography</option>
//               <option value="Venue">Venue</option>
//               <option value="Entertainment">Entertainment</option>
//               <option value="Transportation">Transportation</option>
//               <option value="Florist">Florist</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           {/* Business Description */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">Business Description</h2>
//             <textarea
//               name="businessDescription"
//               value={formData.businessDescription}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows="4"
//               placeholder="Describe your business and what makes it unique..."
//               required
//             ></textarea>
//           </div>

//           {/* Location */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">Location</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                 <input
//                   type="text"
//                   name="city"
//                   value={formData.location.city}
//                   onChange={handleLocationChange}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
//                 <input
//                   type="text"
//                   name="area"
//                   value={formData.location.area}
//                   onChange={handleLocationChange}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.location.address}
//                 onChange={handleLocationChange}
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           </div>

//           {/* Business Logo & Cover Image */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">Business Logo & Cover Image</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
//                 <div className="flex items-center space-x-4">
//                   <div className="h-24 w-24 rounded-md border flex items-center justify-center bg-gray-50">
//                     {formData.logo ? (
//                       <img
//                         src={URL.createObjectURL(formData.logo)}
//                         alt="Logo Preview"
//                         className="h-full w-full object-contain"
//                       />
//                     ) : (
//                       <span className="text-gray-400">No logo</span>
//                     )}
//                   </div>
//                   <input
//                     type="file"
//                     name="logo"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
//                 <div className="flex items-center space-x-4">
//                   <div className="h-24 w-40 rounded-md border flex items-center justify-center bg-gray-50">
//                     {formData.coverImage ? (
//                       <img
//                         src={URL.createObjectURL(formData.coverImage)}
//                         alt="Cover Image Preview"
//                         className="h-full w-full object-cover"
//                       />
//                     ) : (
//                       <span className="text-gray-400">No cover image</span>
//                     )}
//                   </div>
//                   <input
//                     type="file"
//                     name="coverImage"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Operating Hours */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">Operating Hours</h2>
//             <div className="bg-gray-50 p-4 rounded-md">
//               {formData.operatingHours.map((day, index) => (
//                 <div key={day.day} className="grid grid-cols-5 gap-3 mb-2">
//                   <div className="col-span-1 flex items-center">
//                     <span className="text-sm font-medium text-gray-700">{day.day}</span>
//                   </div>
//                   <div className="col-span-4 flex items-center space-x-3">
//                     <label className="flex items-center">
//                       <input
//                         type="checkbox"
//                         checked={day.closed}
//                         onChange={() => handleOperatingHoursChange(index, 'closed', !day.closed)}
//                         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                       />
//                       <span className="ml-2 text-sm text-gray-700">Closed</span>
//                     </label>
                    
//                     {!day.closed && (
//                       <>
//                         <div className="flex items-center space-x-2">
//                           <span className="text-sm text-gray-700">Open:</span>
//                           <input
//                             type="time"
//                             value={day.open}
//                             onChange={(e) => handleOperatingHoursChange(index, 'open', e.target.value)}
//                             className="w-24 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <span className="text-sm text-gray-700">Close:</span>
//                           <input
//                             type="time"
//                             value={day.close}
//                             onChange={(e) => handleOperatingHoursChange(index, 'close', e.target.value)}
//                             className="w-24 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Services Offered */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">Services Offered</h2>
//             {formData.servicesOffered.map((service, index) => (
//               <div key={index} className="bg-gray-50 p-4 rounded-md mb-3">
//                 <div className="flex justify-between items-center mb-2">
//                   <h3 className="text-sm font-medium text-gray-700">Service #{index + 1}</h3>
//                   {formData.servicesOffered.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeService(index)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
//                     <input
//                       type="text"
//                       value={service.name}
//                       onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
//                       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="e.g., Wedding Photography"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                   <textarea
//                     value={service.description}
//                     onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
//                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     rows="2"
//                     placeholder="Describe the service..."
//                   ></textarea>
//                 </div>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addService}
//               className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4
// font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Add Service
//             </button>
//           </div>

//           {/* Pricing Range */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">Pricing Range</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
//                 <select
//                   value={formData.pricingRange.currency}
//                   onChange={(e) => handlePricingChange('currency', e.target.value)}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="USD">USD ($)</option>
//                   <option value="EUR">EUR (€)</option>
//                   <option value="GBP">GBP (£)</option>
//                   <option value="INR">INR (₹)</option>
//                   <option value="AUD">AUD (A$)</option>
//                   <option value="CAD">CAD (C$)</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Price</label>
//                 <input
//                   type="number"
//                   value={formData.pricingRange.min}
//                   onChange={(e) => handlePricingChange('min', e.target.value)}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="0"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Price</label>
//                 <input
//                   type="number"
//                   value={formData.pricingRange.max}
//                   onChange={(e) => handlePricingChange('max', e.target.value)}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="1000"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Payment Methods */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">Payment Methods Accepted</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.paymentMethods.cash}
//                   onChange={() => handlePaymentMethodChange('cash')}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <span className="text-sm text-gray-700">Cash</span>
//               </label>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.paymentMethods.creditCard}
//                   onChange={() => handlePaymentMethodChange('creditCard')}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <span className="text-sm text-gray-700">Credit Card</span>
//               </label>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.paymentMethods.bankTransfer}
//                   onChange={() => handlePaymentMethodChange('bankTransfer')}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <span className="text-sm text-gray-700">Bank Transfer</span>
//               </label>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.paymentMethods.paypal}
//                   onChange={() => handlePaymentMethodChange('paypal')}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <span className="text-sm text-gray-700">PayPal</span>
//               </label>
//               <div className="col-span-2 md:col-span-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Other Payment Methods</label>
//                 <input
//                   type="text"
//                   value={formData.paymentMethods.other}
//                   onChange={(e) => {
//                     setFormData({
//                       ...formData,
//                       paymentMethods: {
//                         ...formData.paymentMethods,
//                         other: e.target.value
//                       }
//                     });
//                   }}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., Venmo, Zelle, etc."
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Social Media Links */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">Social Media Links (Optional)</h2>
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
//                 <input
//                   type="url"
//                   value={formData.socialMedia.facebook}
//                   onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="https://facebook.com/yourbusiness"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
//                 <input
//                   type="url"
//                   value={formData.socialMedia.instagram}
//                   onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="https://instagram.com/yourbusiness"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
//                 <input
//                   type="url"
//                   value={formData.socialMedia.twitter}
//                   onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="https://twitter.com/yourbusiness"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
//                 <input
//                   type="url"
//                   value={formData.socialMedia.linkedin}
//                   onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="https://linkedin.com/company/yourbusiness"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Other</label>
//                 <input
//                   type="url"
//                   value={formData.socialMedia.other}
//                   onChange={(e) => handleSocialMediaChange('other', e.target.value)}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="https://yourbusiness.com"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Save Button */}
//           <div className="mt-8 flex justify-end">
//             <button
//               type="submit"
//               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Save Profile
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Business_Profile;


import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const Business_Profile = () => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [route, setRoute] = useState(null);

  const start = [23.0511, 72.5714]; // Parasnagar
  const end = [23.05, 72.5469]; // Memnagar
  const API_KEY = "AlzaSyl6PKcc3XKao5bC1hxuQ4rv9reUTdLUwhz"; // Replace with a valid API key

  useEffect(() => {
    // Prevent reinitialization by checking if map already exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = L.map(mapContainerRef.current).setView(start, 14);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const customIcon = new L.Icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    L.marker(start, { icon: customIcon }).addTo(map).bindPopup("Start: Parasnagar");
    L.marker(end, { icon: customIcon }).addTo(map).bindPopup("Destination: Memnagar");

    fetchRoute(map);

    return () => {
      // Clean up on component unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const fetchRoute = async (map) => {
    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[1]},${start[0]};${end[1]},${end[0]}?geometries=geojson&access_token=${API_KEY}`;

    try {
      const response = await fetch(directionsUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log("API Response:", data);

      if (!data.routes || data.routes.length === 0) throw new Error("No route found!");

      const routeCoords = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);

      const routeLine = L.polyline(routeCoords, { color: "blue", weight: 4 }).addTo(map);
      setRoute(routeLine);

    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Mapbox Route from Parasnagar to Memnagar</h1>
      <div ref={mapContainerRef} className="w-[90%] h-[500px] border-2 border-gray-300 shadow-lg rounded-lg"></div>
    </div>
  );
};

export default Business_Profile;
