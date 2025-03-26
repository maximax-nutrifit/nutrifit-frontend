// import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaApple } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../api/authService";

const Login = () => {
  const navigate = useNavigate();

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const loginData = { username, password };

    try {
        const data = await handleLogin(loginData);
        if (data) {
            const { accessToken, refreshToken } = data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } else {
            console.log("Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.log("Login failed. Please try again.");
        console.error("Error:", error);
    }
};

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

        <motion.form 
                    className="login-form" 
                    method="post" 
                    onSubmit={onLogin}
                    variants={itemVariants}
                >
                    <motion.div variants={itemVariants}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="login-input"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="login-input"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <button 
                            type="submit" 
                            className="login-button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                          Login
                        </button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="login-links">
                        <a href="/forgot-password" className="login-link">
                            Forgot password?
                        </a>
                        <a href="/register" className="login-link">
                            Don&apos;t have an account? Sign up now!
                        </a>
                    </motion.div>
                </motion.form>
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
