import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle, XCircle, Loader, Mail, LogIn, Home, AlertCircle, HelpCircle } from "lucide-react";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const baseURL = import.meta.env.VITE_API_URL;
  console.log("Base URL:", import.meta.env.VITE_API_URL);


  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [message, setMessage] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing verification token.");
      console.error("Error: Token is missing in the URL.");
      return;
    }

    axios
      .get(`${baseURL}/api/auth/verify-email?token=${token}`)
      .then((response) => {
        setStatus("success");
        setMessage(response.data.message || "Your account has been verified!");
        setTimeout(() => setShowMessage(true), 400);
      })
      .catch((error) => {
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Verification failed. Please try again."
        );
        setTimeout(() => setShowMessage(true), 400);
      });
  }, [token]);

  const handleResendVerification = async () => {
    if (!email) {
      setResendMessage("No email found. Please try signing up again.");
      return;
    }

    setIsResending(true);
    setResendMessage("");

    try {
      const response = await axios.post(
        `${baseURL}/api/auth/resendverifyEmail`,
        { email }
      );
      setResendMessage(
        "A new verification email has been sent! Check your inbox."
      );
    } catch (error) {
      setResendMessage(
        error.response?.data?.message ||
          "Failed to resend verification email. Try again later."
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-8">
      <div className={`bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-sm text-center transition-all duration-500 ease-in-out ${status === 'verifying' ? 'opacity-90' : 'opacity-100'} transform ${status === 'success' ? 'scale-105' : status === 'error' ? 'scale-100' : ''} hover:shadow-lg`}>
        {/* Header Section */}
        <div className="mb-6 animate-fadeIn">
          <div className="flex justify-center mb-3">
            <img src="/logoFinal.png" alt="Logo" className="h-12 w-auto" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Email Verification</h1>
          <div className="h-1.5 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Loading State */}
        {status === "verifying" && (
          <div className="py-6 animate-fadeIn">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                  <Loader className="w-12 h-12 text-blue-500 animate-spin" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-blue-200 opacity-50 animate-ping"></div>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
              Verifying your email
            </h2>
            <p className="text-gray-500 text-sm">
              Please wait while we confirm your email address...
            </p>
            <div className="mt-4 flex justify-center">
              <div className="w-full max-w-xs bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full animate-progress"></div>
              </div>
            </div>
          </div>
        )}

        {/* Success State */}
        {status === "success" && (
          <div className={`py-6 transition-all duration-500 ${showMessage ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}`}>
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-500 animate-bounce" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-green-200 opacity-50 animate-ping"></div>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
              Account Verified!
            </h2>
            <p className="text-gray-600 text-sm mb-4">{message}</p>
            
            {/* Navigation buttons */}
            <div className="flex flex-col xs:flex-row gap-3 justify-center">
              <button
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md hover:shadow-lg font-medium flex items-center justify-center flex-1 text-sm hover:scale-105"
                onClick={() => navigate("/login")}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Go to Login
              </button>
              <button
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md hover:shadow-lg font-medium flex items-center justify-center flex-1 text-sm hover:scale-105"
                onClick={() => navigate("/")}
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Home
              </button>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className={`py-6 transition-all duration-500 ${showMessage ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}`}>
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
                  <XCircle className="w-12 h-12 text-red-500 animate-pulse" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-red-200 opacity-30 animate-ping"></div>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-600 text-sm mb-4">{message}</p>

            {/* Navigation & Resend Buttons */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col xs:flex-row gap-3 justify-center">
                <button
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md hover:shadow-lg font-medium flex items-center justify-center flex-1 text-sm hover:scale-105"
                  onClick={() => navigate("/login")}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Go to Login
                </button>
                <button
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md hover:shadow-lg font-medium flex items-center justify-center flex-1 text-sm hover:scale-105"
                  onClick={() => navigate("/")}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go to Home
                </button>
              </div>
              <button
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition duration-300 shadow-sm flex items-center justify-center font-medium text-sm hover:scale-105"
                onClick={handleResendVerification}
                disabled={isResending}
              >
                {isResending ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </button>
              {resendMessage && (
                <div className={`text-xs rounded-lg py-2 px-3 flex items-center justify-center ${resendMessage.includes("failed") || resendMessage.includes("No email") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"} animate-fadeIn`}>
                  {resendMessage.includes("failed") || resendMessage.includes("No email") ? (
                    <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                  )}
                  <span>{resendMessage}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Footer Section */}
        <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-center animate-fadeIn">
          <HelpCircle className="w-3 h-3 mr-1" />
          Need help? <a href="/contact" className="text-blue-500 hover:underline ml-1">Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;