import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BusinessOwnerSignup = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: "",
    loading: false,
    error: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getMyLocation = () => {
    setLocation((prev) => ({ ...prev, loading: true, error: null }));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation((prev) => ({ ...prev, latitude, longitude }));

          try {
            // Use Google Maps Geocoding API to get the address
            const response = await axios.get(
              `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AlzaSyl6PKcc3XKao5bC1hxuQ4rv9reUTdLUwhz`
            );

            if (response.data.results && response.data.results.length > 0) {
              const address = response.data.results[0].formatted_address;
              setLocation((prev) => ({ ...prev, address, loading: false }));
              setValue("address", address);
              setValue("latitude", latitude);
              setValue("longitude", longitude);
              toast.success("Location retrieved successfully!");
            } else {
              setLocation((prev) => ({
                ...prev,
                loading: false,
                error: "No address found for the given coordinates",
              }));
              toast.error("No address found for the given coordinates");
            }
          } catch (error) {
            setLocation((prev) => ({
              ...prev,
              loading: false,
              error: "Failed to retrieve address. Please try again.",
            }));
            toast.error("Failed to retrieve address. Please try again.");
          }
        },
        (error) => {
          let errorMessage = "Unable to retrieve your location";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access was denied by the user";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable";
              break;
            case error.TIMEOUT:
              errorMessage = "Request to get location timed out";
              break;
            case error.UNKNOWN_ERROR:
              errorMessage = "An unknown error occurred";
              break;
          }
          setLocation((prev) => ({
            ...prev,
            loading: false,
            error: errorMessage,
          }));
          toast.error(errorMessage);
        }
      );
    } else {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: "Geolocation is not supported by this browser",
      }));
      toast.error("Geolocation is not supported by this browser");
    }
  };

  const submitHandler = async (data) => {
    setIsLoading(true);
    console.log("Data to be send to backend is : ", data);
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/businessOwner/signup`,
        data
      );
      console.log("Response : ", response.data);
      if (response?.status === 201) {
        toast.success("Signup successful! Welcome aboard.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      let errorMessage = "Signup failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
            {/* Business Name */}
            <div>
              <label
                htmlFor="businessName"
                className="block text-sm font-medium text-gray-700"
              >
                Business Name
              </label>
              <div className="mt-1">
                <input
                  id="businessName"
                  type="text"
                  {...register("businessName", {
                    required: "Business name is required",
                    minLength: {
                      value: 2,
                      message: "Business name must be at least 2 characters",
                    },
                  })}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.businessName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.businessName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.businessName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Owner's Full Name */}
            <div>
              <label
                htmlFor="ownerName"
                className="block text-sm font-medium text-gray-700"
              >
                Owner's Full Name
              </label>
              <div className="mt-1">
                <input
                  id="ownerName"
                  type="text"
                  {...register("ownerName", {
                    required: "Owner's name is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Please enter a valid name (letters only)",
                    },
                  })}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.ownerName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.ownerName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.ownerName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phoneNumber"
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9+\-\s()]{10,15}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                    },
                  })}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <div className="mt-1">
                <div className="flex">
                  <input
                    id="address"
                    type="text"
                    placeholder="Click 'Get my location' to retrieve address"
                    readOnly
                    value={location.address}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md rounded-r-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={getMyLocation}
                    disabled={location.loading}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 border-l-0 rounded-md rounded-l-none shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {location.loading ? (
                      <span>Loading...</span>
                    ) : (
                      <>
                        <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                        <span>Get my location</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Hidden fields to store latitude and longitude */}
                <input type="hidden" {...register("latitude")} />
                <input type="hidden" {...register("longitude")} />

                {location.error && (
                  <p className="mt-2 text-sm text-red-600">{location.error}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </form>

          {/* Link to Login Page */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOwnerSignup;
