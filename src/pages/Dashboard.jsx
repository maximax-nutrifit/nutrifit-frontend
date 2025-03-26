import React from "react";
import { motion } from "framer-motion";
import { FaBell, FaHome, FaChartLine, FaCog, FaCheck } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaUsers } from "react-icons/fa";

const recommendedItems = [
  { img: "/assets/bicep-curl.png", title: "Bicep Curl" },
  { img: "/assets/jollof-rice.png", title: "Jollof Rice" },
  { img: "/assets/bicep-curl.png", title: "Bicep Curl" },
];

const data = [
  { name: "Jan", meals: 10, kcal: 15, steps: 5 },
  { name: "Feb", meals: 15, kcal: 10, steps: 8 },
  { name: "Mar", meals: 5, kcal: 25, steps: 6 },
  { name: "Apr", meals: 20, kcal: 12, steps: 10 },
  { name: "May", meals: 10, kcal: 18, steps: 7 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen mb-12 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 space-y-6">
      {/* Progress Section */}
      <div className="bg-gray-800 p-5 rounded-xl shadow-lg w-full max-w-screen mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-300">Your Progress</h3>
          <select className="bg-gray-700 text-white rounded px-3 py-1 text-xs focus:outline-none">
            <option>Month</option>
            <option>Week</option>
          </select>
        </div>

        {/* Days Progress */}
        <div className="flex items-center gap-2 mt-3">
          {[1, 2, 3].map((day) => (
            <div
              key={day}
              className="w-7 h-7 flex items-center justify-center bg-purple-500 text-white rounded-full"
            >
              <FaCheck size={12} />
            </div>
          ))}
          {[4, 5, 6, 7].map((day) => (
            <div
              key={day}
              className="w-7 h-7 flex items-center justify-center bg-gray-700 text-gray-300 rounded-full text-xs"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-between mt-4 text-center bg-gray-700 p-3 rounded-lg">
          <div>
            <p className="text-lg font-bold">20</p>
            <p className="text-xs text-gray-400">Meals logged</p>
          </div>
          <div>
            <p className="text-lg font-bold">1345</p>
            <p className="text-xs text-gray-400">KCAL</p>
          </div>
          <div>
            <p className="text-lg font-bold">5500</p>
            <p className="text-xs text-gray-400">Steps</p>
          </div>
        </div>
      </div>

      {/* Recommended Meals & Workouts */}
      <p className="text-lg font-semibold">AI-recommended meals & workouts</p>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {recommendedItems.map((item, idx) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={idx}
            className="bg-gray-800 p-4 rounded-2xl flex flex-col items-center w-40 shadow-lg"
          >
            <img
              src={item.img}
              alt={item.title}
              className="rounded-xl w-full h-24 object-cover"
            />
            <div className="flex justify-between items-center w-full px-3 py-2 bg-gray-700 rounded-b-xl">
              <p className="text-sm text-white">{item.title}</p>
              <div className="flex items-center text-gray-300 text-sm">
                <FaUsers className="mr-1" /> 104
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Health Advice Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="w-full mt-4 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-orange-500 to-purple-500 shadow-md"
      >
        Health Advice
      </motion.button>

      {/* Progress Summary Chart */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-3">Progress Summary</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="meals"
              stroke="orange"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="kcal"
              stroke="blue"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="steps"
              stroke="green"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
