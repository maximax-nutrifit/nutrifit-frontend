import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaApple } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1A1A1A] text-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-[#2C2C2C] p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-semibold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-gray-400">Login to access your account</p>

        <div className="flex mt-5 space-x-2 bg-[#EAD9D3] p-1 rounded-full">
          <button className="flex-1 py-2 rounded-full bg-[#F47C4A] text-white font-semibold cursor-pointer">Login</button>
          <button 
          onClick={() => navigate("/signup")}
          className="flex-1 py-2 rounded-full text-gray-800 cursor-pointer">Sign Up</button>
        </div>

        <div className="mt-5">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Generic@gmail.com"
            className="w-full mt-1 p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="mt-5 relative">
          <label className="block text-sm font-medium">Password</label>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="**********"
            className="w-full mt-1 p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-11 text-gray-400 hover:text-orange-500 transition"
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2 accent-orange-500" /> Remember Me
          </label>
          <a href="#" className="text-orange-400 hover:underline">Forgot your password?</a>
        </div>

        <button className="w-full mt-4 p-3 bg-orange-500 rounded-lg text-white font-bold hover:bg-orange-600 transition">
          Login
        </button>

        <p className="text-center text-gray-400 mt-6">By signing up, you agree to our <span className="text-orange-400 underline">Terms of service</span> and <span className="text-orange-400 underline">Privacy policy</span></p>

        <div className="mt-6 text-center">
          <p className="text-gray-400">or sign up with</p>
          <div className="flex justify-center gap-4 mt-3">
            <button className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition">
              <FaGoogle className="text-red-500" /> Sign up with Google
            </button>
            <button className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition">
              <FaApple className="text-white" /> Sign up with Apple
            </button>
          </div>
        </div>

        <p className="text-center text-gray-400 mt-5">
          Don’t have an Account?{' '}
          <span
            onClick={() => navigate("/signup")}
            className="text-orange-400 hover:underline cursor-pointer"
          >
            Sign up here
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
