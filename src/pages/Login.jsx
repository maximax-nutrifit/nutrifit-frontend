import { FaGoogle, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleLogin } from "../api/authService";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const onLogin = async (e) => {
    e.preventDefault(); // Prevent default refresh behavior
    const username = e.target.username.value;
    const password = e.target.password.value;
    const loginData = { username, password };
    
    try {
      const data = await handleLogin(loginData);
      if (data) {
        const { accessToken, refreshToken, userResponseDTO } = data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userResponseDTO", JSON.stringify(userResponseDTO));
        setTimeout(() => navigate("/"), 2000);
      } else {
        console.log("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log("Login failed. Please try again.");
      console.error("Error:", error);
    }
  };  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md m-10 bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-purple-400">Welcome Back</h2>
        <p className="text-center text-gray-400">Login to access your account</p>

        {/* Tab Switching with Sliding Background */}
        <div className="relative flex mt-5 space-x-2 bg-gray-700 p-1 rounded-full">
          <motion.div
            className="absolute top-0 left-0 h-full bg-purple-500 rounded-full"
            initial={{ width: "50%", left: activeTab === "login" ? "0%" : "50%" }}
            animate={{ left: activeTab === "login" ? "0%" : "50%" }}
            transition={{ duration: 0.3 }}
            style={{ width: "50%" }}
          />
          <button
            onClick={() => setActiveTab("login")}
            className={`relative flex-1 py-2 rounded-full font-semibold z-10 ${
              activeTab === "login" ? "text-white" : "text-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setActiveTab("signup");
              navigate("/signup");
            }}
            className={`relative flex-1 py-2 rounded-full font-semibold z-10 ${
              activeTab === "signup" ? "text-white" : "text-gray-300"
            }`}
          >
            Sign Up
          </button>
        </div>

        <motion.form className="mt-6 space-y-4" onSubmit={onLogin} variants={itemVariants}>
          <motion.div variants={itemVariants}>
            <label className="block text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <label className="block text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </motion.div>

          <motion.button
            type="submit"
            className="w-full py-2 mt-2 bg-purple-500 rounded-lg font-semibold text-white hover:bg-purple-600 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Login
          </motion.button>

          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <a href="/forgot-password" className="hover:text-purple-400">
              Forgot password?
            </a>
            <a href="/signup" className="hover:text-purple-400">
              Sign up now!
            </a>
          </div>
        </motion.form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">or sign in with</p>
          <div className="flex justify-center gap-4 mt-3">
            <button className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition">
              <FaGoogle className="text-red-500" /> Google
            </button>
            <button className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition">
              <FaApple className="text-white" /> Apple
            </button>
          </div>
        </div>

        <p className="text-center text-gray-400 mt-5">
          Don’t have an Account?{" "}
          <span onClick={() => navigate("/signup")} className="text-purple-400 hover:underline cursor-pointer">
            Sign up here
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
