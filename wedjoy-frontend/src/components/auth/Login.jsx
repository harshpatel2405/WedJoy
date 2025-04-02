import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

// Add a custom axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ,
  withCredentials: true,
  timeout: 10000,
});

// Add request interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        await api.post("/api/auth/refresh-token");
        return api(originalRequest);
      } catch (refreshError) {
        // Redirect to login if refresh token is invalid
        localStorage.removeItem("id");
        localStorage.removeItem("role");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for redirect message from other pages
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get("message");
    const type = params.get("type");

    if (message && type) {
      if (type === "success") {
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Bounce,
        });
      } else if (type === "error") {
        toast.error(message, {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Bounce,
        });
      }
    }

    // Get stored attempts from sessionStorage
    const storedAttempts = sessionStorage.getItem("loginAttempts");
    const lockUntil = sessionStorage.getItem("lockUntil");

    if (storedAttempts) {
      setLoginAttempts(parseInt(storedAttempts));
    }

    if (lockUntil && new Date(lockUntil) > new Date()) {
      setLocked(true);
      const remainingTime = Math.ceil(
        (new Date(lockUntil) - new Date()) / 1000
      );
      setLockTimer(remainingTime);

      const interval = setInterval(() => {
        setLockTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setLocked(false);
            sessionStorage.removeItem("lockUntil");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [location.search]);

  const submitHandler = async (data) => {
    if (locked) return;

    try {
      // Add request body validation
      if (!data.email || !data.password) {
        throw new Error("Please provide both email and password");
      }

      // Add CSRF protection token (if your backend supports it)
      const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      const res = await api.post("/api/auth/login", data, {
        headers: {
          "X-XSRF-TOKEN": csrfToken || "",
        },
      });

      // Reset login attempts on success
      setLoginAttempts(0);
      sessionStorage.removeItem("loginAttempts");

      // Sanitize and validate response
      // if (!res?.data?._id || !res?.data?.role) {
      //   throw new Error("Invalid server response");
      // }

      // Securely store user data
      // Use secure, HTTP-only cookies instead of localStorage for tokens
      localStorage.setItem("id", res.data._id);
      localStorage.setItem("role", res.data.role);

      toast.success("Login Successful! Welcome back.", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        transition: Bounce,
      });

      // Redirect based on role with proper state management
      setTimeout(() => {
        const redirectPath = getRedirectPath(res.data.role);
        navigate(redirectPath, { replace: true });
      }, 1500);
    } catch (error) {
      // Implement rate limiting for failed attempts
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      sessionStorage.setItem("loginAttempts", newAttempts.toString());

      // Lock account after 5 failed attempts
      if (newAttempts >= 5) {
        const lockTime = 5 * 60; // 5 minutes in seconds
        setLocked(true);
        setLockTimer(lockTime);

        const lockUntil = new Date(new Date().getTime() + lockTime * 1000);
        sessionStorage.setItem("lockUntil", lockUntil.toString());

        toast.error(
          "Too many failed attempts. Please try again after 5 minutes.",
          {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
            transition: Bounce,
          }
        );

        const interval = setInterval(() => {
          setLockTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setLocked(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        // Handle specific error types
        const errorMsg = error.response?.data?.message || error.message;

        if (error.response?.status === 401) {
          setError("password", {
            type: "manual",
            message: "Invalid email or password",
          });
        } else if (error.response?.status === 403) {
          toast.error(`${error.response.data?.message}`, {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
            transition: Bounce,
          });
        } else {
          toast.error(`Error: ${errorMsg}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
            transition: Bounce,
          });
        }
      }
    }
  };

  // Helper function to determine redirect path based on role
  const getRedirectPath = (role) => {
    switch (role) {
      case "Admin":
        return "/admin/dashboard";
      case "User":
        return "/user/dashboard";
      case "BusinessOwner":
        return "/businessOwner/dashboard";
      case "EventOrganizer":
        return "/eventOrganizer/dashboard";
      default:
        return "/";
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
      >
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center">
            <img
              className="h-16  w-auto"
              src="/logoFinal.png"
              alt="WedJoy Logo"
            />
          </Link>
          <h2 className="mt--10text-3xl font-extrabold text-gray-900">
            Welcome Back , Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitHandler)}>
          <div className="rounded-md -space-y-px">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  disabled={locked}
                  className={`appearance-none block w-full pl-10 pr-3 py-3 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  disabled={locked}
                  className={`appearance-none block w-full pl-10 pr-10 py-3 border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Link
              to="/forgot-password"
              className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 block text-right"
            >
              Forgot your password?
            </Link>
          </div>

          {locked && (
            <div className="text-center p-3 bg-red-50 text-red-700 rounded-lg">
              <p className="font-medium">Account temporarily locked</p>
              <p className="text-sm">Try again in {formatTime(lockTimer)}</p>
            </div>
          )}

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting || locked}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                isSubmitting || locked
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <span>Sign in</span>
              )}
            </motion.button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};

export default Login;
