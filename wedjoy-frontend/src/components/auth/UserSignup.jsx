import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserCircle, Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import CitySelector from "../common/CitySelector";
import cities from "../common/cities";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Form validation schema using Yup
const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Invalid phone number"
    )
    .required("Phone number is required"),
  city: yup.string().required("City is required"),
  dob: yup.string().required("Date of birth is required"),
  gender: yup.string().required("Gender is required"),
  interests: yup.string().required("Please share some of your interests"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Please confirm your password"),
});

const UserSignup = () => {
  const [passwordScore, setPasswordScore] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // Validates on change instead of just on submit
  });

  const password = watch("password", "");

  // Effect to analyze password strength using zxcvbn
  useEffect(() => {
    if (password) {
      const result = zxcvbn(password);
      setPasswordScore(result.score);
    } else {
      setPasswordScore(0);
    }
  }, [password]);
  const handleCitySelect = (selectedOption) => {
    setValue("city", selectedOption ? selectedOption.value : ""); // Updates form field
  };

  const submitHandler = async (data) => {
    const [year, month, day] = data.dob.split("-");
    const formattedDob = `${day}/${month}/${year}`;
    console.log(data);
    console.log("Profile Image : ", data.profilePicture[0]);
    if (
      data.profilePicture instanceof FileList &&
      data.profilePicture.length > 0
    ) {
      console.log("✅ File Exists:", data.profilePicture[0]);
    } else {
      console.warn("⚠️ No profile picture selected");
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("dob", formattedDob);
    formData.append("gender", data.gender);
    formData.append("city", data.city);
    formData.append("interests", data.interests);
    formData.append("password", data.password);
    formData.append("profilePicture", data.profilePicture[0]);

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${baseURL}/api/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response?.status === 201) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error("Failed to create account. Please try again.");
      }
      console.error("Signup error:", error.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getStrengthInfo = () => {
    switch (passwordScore) {
      case 0:
        return {
          text: "Very Weak",
          color: "bg-red-500",
          textColor: "text-red-500",
        };
      case 1:
        return { text: "Weak", color: "bg-red-400", textColor: "text-red-400" };
      case 2:
        return {
          text: "Fair",
          color: "bg-orange-400",
          textColor: "text-orange-400",
        };
      case 3:
        return {
          text: "Good",
          color: "bg-yellow-400",
          textColor: "text-yellow-400",
        };
      case 4:
        return {
          text: "Strong",
          color: "bg-green-500",
          textColor: "text-green-500",
        };
      default:
        return {
          text: "Very Weak",
          color: "bg-red-500",
          textColor: "text-red-500",
        };
    }
  };

  const strengthInfo = getStrengthInfo();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-100 via-violet-100 to-cyan-100 p-4">
      {/* Toast Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-xl border border-purple-100">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-violet-700 mb-2">
            Join Our Community
          </h1>
          <p className="text-gray-600">
            Connect, collaborate, and grow with like-minded individuals
          </p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-28 h-28 mb-3">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="w-full h-full rounded-full object-cover border-4 border-violet-200 shadow-md"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-r from-violet-200 to-fuchsia-200 flex items-center justify-center shadow-md">
                  <UserCircle size={64} className="text-violet-500" />
                </div>
              )}
              <label
                htmlFor="profilePicture"
                className="absolute bottom-1 right-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white p-2 rounded-full cursor-pointer hover:from-violet-700 hover:to-fuchsia-700 shadow-lg transition-all duration-300"
              >
                <Camera size={18} />
              </label>
            </div>
            <input
              type="file"
              id="profilePicture"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewImage(reader.result); // ✅ Set image preview
                  };
                  reader.readAsDataURL(file);
                }

                setValue("profilePicture", e.target.files); // ✅ Store file properly
                console.log("File Selected:", file); // ✅ Debugging
              }}
            />

            <p className="text-sm text-gray-500">Upload your profile photo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.fullName
                    ? "border-red-500 bg-red-50"
                    : "border-violet-200"
                } focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200`}
                placeholder="John Doe"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-violet-200"
                } focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200`}
                placeholder="johndoe@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.phone
                    ? "border-red-500 bg-red-50"
                    : "border-violet-200"
                } focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200`}
                placeholder="+91 99999 88888"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="form-group">
              {/* <label className="block text-gray-700 font-medium mb-1">City</label> */}
              <CitySelector
                label="City"
                cities={cities}
                onSelect={handleCitySelect}
              />

              {/* Hidden Input for Form Validation */}
              <input
                type="hidden"
                {...register("city", { required: "City is required" })}
              />

              {errors.city && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.dob ? "border-red-500 bg-red-50" : "border-violet-200"
                } focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200`}
                {...register("dob")}
              />
              {errors.dob && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dob.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-1">
                Gender
              </label>
              <select
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.gender
                    ? "border-red-500 bg-red-50"
                    : "border-violet-200"
                } focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200`}
                {...register("gender")}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-Binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>

          <div className="form-group mt-5">
            <label className="block text-gray-700 font-medium mb-1">
              What are you interested in?
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200`}
              placeholder="Tell us about your interests, hobbies, skills..."
              rows="3"
              {...register("interests")}
            ></input>
            {errors.interests && (
              <p className="text-red-500 text-xs mt-1">
                {errors.interests.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-1">
                Create Password
              </label>
              <input
                type="password"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password
                    ? "border-red-500 bg-red-50"
                    : "border-violet-200"
                } focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200`}
                placeholder="•••••••••••"
                {...register("password")}
              />

              {/* zxcvbn Password strength indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">
                      Password Strength:
                    </span>
                    <span
                      className={`text-xs font-bold ${strengthInfo.textColor}`}
                    >
                      {strengthInfo.text}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strengthInfo.color}`}
                      style={{ width: `${(passwordScore / 4) * 100}%` }}
                    ></div>
                  </div>

                  {/* Password suggestions based on zxcvbn score */}
                  {passwordScore < 3 && (
                    <p className="text-xs text-gray-600 mt-1">
                      {passwordScore < 2
                        ? "Try adding more complexity with special characters and varied patterns."
                        : "Your password is fair, but could be stronger. Try making it longer or more complex."}
                    </p>
                  )}
                </div>
              )}
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.confirmPassword
                    ? "border-red-500 bg-red-50"
                    : "border-violet-200"
                } focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200`}
                placeholder="•••••••••••"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {password && (
            <div className="mt-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 font-medium mb-2">
                Your password must include:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                <div
                  className={`flex items-center text-xs ${
                    password.length >= 8 ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 mr-1 ${
                      password.length >= 8 ? "text-green-500" : "text-gray-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        password.length >= 8
                          ? "M5 13l4 4L19 7"
                          : "M6 18L18 6M6 6l12 12"
                      }
                    />
                  </svg>
                  At least 8 characters
                </div>
                <div
                  className={`flex items-center text-xs ${
                    /[A-Z]/.test(password) ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 mr-1 ${
                      /[A-Z]/.test(password)
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        /[A-Z]/.test(password)
                          ? "M5 13l4 4L19 7"
                          : "M6 18L18 6M6 6l12 12"
                      }
                    />
                  </svg>
                  One uppercase letter
                </div>
                <div
                  className={`flex items-center text-xs ${
                    /[a-z]/.test(password) ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 mr-1 ${
                      /[a-z]/.test(password)
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        /[a-z]/.test(password)
                          ? "M5 13l4 4L19 7"
                          : "M6 18L18 6M6 6l12 12"
                      }
                    />
                  </svg>
                  One lowercase letter
                </div>
                <div
                  className={`flex items-center text-xs ${
                    /[0-9]/.test(password) ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 mr-1 ${
                      /[0-9]/.test(password)
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        /[0-9]/.test(password)
                          ? "M5 13l4 4L19 7"
                          : "M6 18L18 6M6 6l12 12"
                      }
                    />
                  </svg>
                  One number
                </div>
                <div
                  className={`flex items-center text-xs ${
                    /[^A-Za-z0-9]/.test(password)
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 mr-1 ${
                      /[^A-Za-z0-9]/.test(password)
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        /[^A-Za-z0-9]/.test(password)
                          ? "M5 13l4 4L19 7"
                          : "M6 18L18 6M6 6l12 12"
                      }
                    />
                  </svg>
                  One special character
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3 rounded-lg font-semibold transition-all hover:from-violet-700 hover:to-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
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
                  Creating Account...
                </div>
              ) : (
                "Join Community"
              )}
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-violet-600 font-medium hover:underline transition-all"
              >
                Sign in
              </Link>
            </p>
            <p className="text-gray-500 text-xs mt-3">
              By joining, you agree to our{" "}
              <Link to="/terms" className="text-violet-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-violet-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
