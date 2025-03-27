import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast ,ToastContainer} from "react-toastify";
import axios from "axios";

const ResetPasswordDemo = () => {
  const { register, handleSubmit } = useForm();
  const token = useParams().token;
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    console.log("Data sent to API:", data);

    try {
      const res = await axios.post("http://localhost:1999/api/auth/updatePassword", {
        newPassword: data.newPassword, // ✅ Matches API expected key
        token: token,
      });

      if (res.status === 200) {
        console.log("Password updated successfully");
        toast.success("Password updated successfully");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      console.error("Password update failed", error);
      toast.error(error.response?.data?.message || "Password update failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-red-600 text-center mb-4">Reset Password</h1>
        
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              {...register("newPassword", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-lg font-semibold text-red-600 border-2 border-red-600 rounded-md bg-white transition-all duration-300 ease-in-out hover:bg-red-600 hover:text-white transform hover:-translate-y-1"
          >
            Reset Password
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
    
  );
};

export default ResetPasswordDemo;
