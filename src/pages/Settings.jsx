import React from "react";
import { motion } from "framer-motion";
import { FaBell, FaHeart, FaLock, FaPowerOff, FaHeadset } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { logout } from "../api/authService";

const ProfileSettings = () => {

  const userData = JSON.parse(localStorage.getItem("userResponseDTO"));
  console.log(userData);
  const userName = userData.name;
  const email = userData.email;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen mb-18 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mt-8"
      >
        <img
          src="/assets/avatar.png"
          alt="User Avatar"
          className="w-28 h-28 rounded-full border-4 border-gray-600"
        />
        <h2 className="text-xl font-bold mt-3">{userName}</h2>
        <p className="text-sm text-gray-400">{email}</p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-2 text-lg font-semibold rounded-full bg-gradient-to-r from-orange-500 to-purple-500 shadow-lg"
        >
          Edit Profile
        </motion.button>
      </motion.div>

      {/* Actions */}
      <div className="mt-6">
        <h3 className="text-md font-semibold text-gray-400 mb-2">Actions</h3>
        <div className="bg-gray-800 p-3 rounded-lg">
          <MenuItem icon={<FaHeart />} text="Health Advice" />
          <MenuItem icon={<FaHeadset />} text="Contact Support" />
        </div>
      </div>

      {/* Preferences */}
      <div className="mt-6">
        <h3 className="text-md font-semibold text-gray-400 mb-2">Preferences</h3>
        <div className="bg-gray-800 p-3 rounded-lg">
          <ToggleItem icon={<FaBell />} text="Push Notifications" />
          <MenuItem icon={<FaLock />} text="Change Password" />
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-700 transition text-red-500"
            onClick={handleLogout}
          >
            <div className="flex items-center gap-3">
              <span className="bg-purple-500 p-2 rounded-lg text-white">
                <FaPowerOff />
              </span>
              <p className="text-sm">Log Out</p>
            </div>
            <IoIosArrowForward className="text-gray-400" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Menu Item Component
const MenuItem = ({ icon, text, color, onClick }) => (
  <motion.div
    whileTap={{ scale: 0.95 }}
    className={`flex justify-between items-center p-3 rounded-lg hover:bg-gray-700 transition ${color || "text-white"}`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <span className="bg-purple-500 p-2 rounded-lg text-white">{icon}</span>
      <p className="text-sm">{text}</p>
    </div>
    <IoIosArrowForward className="text-gray-400" />
  </motion.div>
);

// Toggle Switch Component
const ToggleItem = ({ icon, text }) => (
  <motion.div
    whileTap={{ scale: 0.95 }}
    className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-700 transition"
  >
    <div className="flex items-center gap-3">
      <span className="bg-purple-500 p-2 rounded-lg text-white">{icon}</span>
      <p className="text-sm">{text}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer-checked:bg-purple-500"></div>
    </label>
  </motion.div>
);

export default ProfileSettings;