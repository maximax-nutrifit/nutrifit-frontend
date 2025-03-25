import React from "react";
import { motion } from "framer-motion";
import { FaBell, FaHome, FaChartLine, FaCog } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
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
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
            {/* Progress Section */}
            <div className="bg-gray-800 p-4 rounded-lg mx-auto max-w-md lg:max-w-lg">
                <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">Your Progress</h3>
                    <select className="bg-gray-700 text-white rounded px-2 py-1">
                        <option>Month</option>
                        <option>Week</option>
                    </select>
                </div>
                <div className="flex justify-between mt-4 text-center">
                    <div>
                        <p className="text-xl font-bold">20</p>
                        <p className="text-sm text-gray-400">Meals logged</p>
                    </div>
                    <div>
                        <p className="text-xl font-bold">1345</p>
                        <p className="text-sm text-gray-400">KCAL</p>
                    </div>
                    <div>
                        <p className="text-xl font-bold">5500</p>
                        <p className="text-sm text-gray-400">Steps</p>
                    </div>
                </div>
            </div>

            {/* Recommended Meals & Workouts */}
            <p className="text-2xl font-light">AI-recommended meals & workouts</p>
            <div className="mt-6 flex flex-wrap justify-left">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {recommendedItems.map((item, idx) => (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            key={idx}
                            className="bg-gray-800 p-3 rounded-2xl flex flex-col items-center w-40 sm:w-52 md:w-56 lg:w-60 shadow-lg"
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                className="rounded-xl w-full h-32 sm:h-40 md:h-48 object-cover"
                            />
                            <div className="flex justify-between items-center w-full px-3 py-2 bg-gray-700 rounded-b-xl">
                                <p className="text-sm sm:text-base text-white">{item.title}</p>
                                <div className="flex items-center text-gray-300 text-sm sm:text-base">
                                    <FaUsers className="mr-1" /> 104
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Health Advice Button */}
            <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-full mt-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-orange-500 to-purple-500">
                Health Advice
            </motion.button>

            {/* Progress Summary Chart */}
            <div className="bg-gray-800 p-4 mt-6 rounded-lg mb-20">
                <h3 className="text-lg font-semibold mb-2">Progress Summary</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data}>
                        <XAxis dataKey="name" stroke="#aaa" />
                        <YAxis stroke="#aaa" />
                        <Tooltip />
                        <Line type="monotone" dataKey="meals" stroke="orange" strokeWidth={2} />
                        <Line type="monotone" dataKey="kcal" stroke="blue" strokeWidth={2} />
                        <Line type="monotone" dataKey="steps" stroke="green" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
