import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ResetPasswordPage = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [step, setStep] = useState(1);
  const email = watch("email");
  const otp = watch("otp");

  const sendOtpHandler = () => {
    if (email) {
      console.log("Sending OTP to:", email);
      setStep(2);
    }
  };

  const verifyOtpHandler = () => {
    if (otp === "123456") { // Simulated OTP verification
      console.log("OTP Verified");
      setStep(3);
    }
  };

  const resetPasswordHandler = (data) => {
    console.log("Password Reset Successful", data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full p-6 bg-white rounded-lg shadow sm:max-w-md">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Reset Password</h2>

        {step === 1 && (
          <>
            <label className="block mb-2 text-sm font-medium">Your Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded"
              placeholder="name@example.com"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            <button onClick={sendOtpHandler} className="w-full mt-4 bg-blue-600 text-white py-2 rounded">Send OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block mb-2 text-sm font-medium">Enter OTP</label>
            <input
              type="text"
              {...register("otp", { required: "OTP is required" })}
              className="w-full p-2 border rounded"
              placeholder="Enter OTP"
            />
            {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
            <button onClick={verifyOtpHandler} className="w-full mt-4 bg-green-600 text-white py-2 rounded">Verify OTP</button>
          </>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit(resetPasswordHandler)}>
            <label className="block mb-2 text-sm font-medium">New Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border rounded"
              placeholder="New Password"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            
            <label className="block mt-4 mb-2 text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: value => value === watch("password") || "Passwords do not match"
              })}
              className="w-full p-2 border rounded"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

            <button type="submit" className="w-full mt-4 bg-purple-600 text-white py-2 rounded">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
