import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Debug logger
const debugLog = (message, data = {}) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔍 DEBUG: ${message}`, data);
  }
};

const ForgotPasswordPage = () => {
  // State management
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [email, setEmail] = useState('');
  
  // React Hook Form setup for each step
  const { 
    register: registerEmail, 
    handleSubmit: handleSubmitEmail, 
    formState: { errors: emailErrors, isValid: emailIsValid } 
  } = useForm({
    mode: 'onChange',
    defaultValues: { email: '' }
  });
  
  const { 
    register: registerOtp, 
    handleSubmit: handleSubmitOtp, 
    formState: { errors: otpErrors, isValid: otpIsValid },
    watch: watchOtp
  } = useForm({
    mode: 'onChange',
    defaultValues: { otp: '' }
  });
  
  const { 
    register: registerPassword, 
    handleSubmit: handleSubmitPassword, 
    formState: { errors: passwordErrors, isValid: passwordIsValid },
    watch: watchPassword,
    setError: setPasswordError
  } = useForm({
    mode: 'onChange',
    defaultValues: { newPassword: '', confirmPassword: '' }
  });

  // Debug logging on state changes
  useEffect(() => {
    debugLog('Step changed', { step });
  }, [step]);
  
  useEffect(() => {
    debugLog('API Response', apiResponse);
  }, [apiResponse]);

  // API call with error handling and debugging
  const callApi = async (endpoint, data) => {
    setIsLoading(true);
    debugLog('API Request', { endpoint, data });
    
    try {
      const response = await axios.post(endpoint, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      debugLog('API Response', { status: response.status, data: response.data });
      
      setApiResponse({
        success: true,
        status: response.status,
        message: response.data.message,
        data: response.data
      });
      
      toast.success(response.data.message || 'Operation successful');
      return { success: true, data: response.data };
    } catch (error) {
      debugLog('API Error', { error });
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Network error. Please try again.';
                          
      setApiResponse({
        success: false,
        message: errorMessage,
        error
      });
      
      toast.error(errorMessage);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: Send OTP
  const handleSendOtp = async (formData) => {
    debugLog('Sending OTP', formData);
    setEmail(formData.email); // Store email for future steps
    
    const result = await callApi('http://localhost:1999/api/auth/resetPassword', { 
      email: formData.email,
      step: 'request'
    });
    
    if (result.success) {
      setStep(2);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (formData) => {
    debugLog('Verifying OTP', { email, otp: formData.otp });
    
    const result = await callApi('http://localhost:1999/api/auth/resetPassword', { 
      email,
      otp: formData.otp,
      step: 'verify'
    });
    
    if (result.success) {
      setStep(3);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (formData) => {
    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match'
      });
      return;
    }
    
    debugLog('Resetting Password', { email, password: '******' });
    
    const result = await callApi('http://localhost:1999/api/auth/resetPassword', {
      email,
      newPassword: formData.newPassword,
      step: 'reset'
    });
    
    if (result.success) {
      setStep(4);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: 'None', color: 'bg-gray-200' };
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    const strengthMap = [
      { text: 'Weak', color: 'bg-red-500' },
      { text: 'Fair', color: 'bg-orange-500' },
      { text: 'Good', color: 'bg-yellow-500' },
      { text: 'Strong', color: 'bg-green-500' }
    ];
    
    return { 
      strength, 
      ...strengthMap[strength - 1] || { text: 'None', color: 'bg-gray-200' } 
    };
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    debugLog('Resending OTP', { email });
    await callApi('http://localhost:1999/api/auth/resetPassword', { 
      email,
      step: 'request'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <ToastContainer position="top-right" autoClose={5000} />
      
      
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h1>
          
          {/* Step Indicator */}
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${step >= i 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                    : 'bg-gray-200 text-gray-500'} 
                  ${step === i ? 'ring-4 ring-blue-200' : ''}`}
              >
                <span className="font-bold">{i}</span>
              </div>
            ))}
          </div>
          
          <p className="text-gray-600">
            {step === 1 && "Enter your email to receive a verification code"}
            {step === 2 && "Enter the 6-digit code sent to your email"}
            {step === 3 && "Create a new password for your account"}
            {step === 4 && "Password reset successfully!"}
          </p>
        </div>

        {/* Step 1: Email Form */}
        {step === 1 && (
          <form onSubmit={handleSubmitEmail(handleSendOtp)} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className={`w-full px-4 py-3 rounded-lg border ${
                  emailErrors.email ? 'border-red-500' : 'border-gray-300'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition`}
                placeholder="yourname@example.com"
                {...registerEmail('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {emailErrors.email && (
                <p className="mt-1 text-sm text-red-500">{emailErrors.email.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !emailIsValid}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all
                bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
                focus:outline-none focus:ring-2 focus:ring-blue-300
                ${isLoading || !emailIsValid ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : 'Send Verification Code'}
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification Form */}
        {step === 2 && (
          <form onSubmit={handleSubmitOtp(handleVerifyOtp)} className="space-y-5">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Verification Code
              </label>
              <div className="relative">
                <input
                  id="otp"
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    otpErrors.otp ? 'border-red-500' : 'border-gray-300'
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-center text-lg tracking-widest`}
                  placeholder="• • • • • •"
                  maxLength={6}
                  {...registerOtp('otp', { 
                    required: 'OTP is required',
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: 'OTP must be 6 digits'
                    }
                  })}
                />
                {otpErrors.otp && (
                  <p className="mt-1 text-sm text-red-500">{otpErrors.otp.message}</p>
                )}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                We sent a 6-digit code to <span className="font-medium">{email}</span>
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading || !otpIsValid}
                className={`flex-1 py-3 px-4 rounded-lg text-white font-medium transition-all
                  bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
                  focus:outline-none focus:ring-2 focus:ring-blue-300
                  ${isLoading || !otpIsValid ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : 'Verify Code'}
              </button>
            </div>
            
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Didn't receive code? Send again
              </button>
            </div>
          </form>
        )}

        {/* Step 3: New Password Form */}
        {step === 3 && (
          <form onSubmit={handleSubmitPassword(handleResetPassword)} className="space-y-5">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                className={`w-full px-4 py-3 rounded-lg border ${
                  passwordErrors.newPassword ? 'border-red-500' : 'border-gray-300'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none`}
                placeholder="Create new password"
                {...registerPassword('newPassword', { 
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
              />
              {passwordErrors.newPassword && (
                <p className="mt-1 text-sm text-red-500">{passwordErrors.newPassword.message}</p>
              )}
              
              {/* Password Strength Meter */}
              {watchPassword('newPassword') && (
                <>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {[0, 1, 2, 3].map((index) => {
                      const strength = getPasswordStrength(watchPassword('newPassword'));
                      return (
                        <div 
                          key={index} 
                          className={`h-1 rounded-full ${index < strength.strength ? strength.color : 'bg-gray-200'}`} 
                        />
                      );
                    })}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Password strength: <span className="font-medium">{getPasswordStrength(watchPassword('newPassword')).text}</span>
                  </p>
                </>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className={`w-full px-4 py-3 rounded-lg border ${
                  passwordErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none`}
                placeholder="Confirm new password"
                {...registerPassword('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === watchPassword('newPassword') || 'Passwords do not match'
                })}
              />
              {passwordErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{passwordErrors.confirmPassword.message}</p>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading || !passwordIsValid}
                className={`flex-1 py-3 px-4 rounded-lg text-white font-medium transition-all
                  bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
                  focus:outline-none focus:ring-2 focus:ring-blue-300
                  ${isLoading || !passwordIsValid ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </span>
                ) : 'Reset Password'}
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Success Page */}
        {step === 4 && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Password Reset Successfully!</h2>
            <p className="text-gray-600 mb-6">Your password has been updated. You can now log in with your new password.</p>
            <a 
              href="/login" 
              className="inline-block py-3 px-6 rounded-lg text-white font-medium transition-all
                bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
                focus:outline-none focus:ring-2 focus:ring-blue-300 transform hover:scale-105"
            >
              Go to Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;