import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBell, FaHome, FaUtensils, FaClipboardList, FaChartLine, FaUser } from "react-icons/fa";

const remindersData = [
  { title: "Meal Logging", category: "Jollof Rice", time: "10:30 AM", img: "/assets/jollof-rice.png" },
  { title: "Workout", category: "Bicep Curl", time: "6:00 PM", img: "/assets/bicep-curl.png" },
];

const ReminderPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [reminders, setReminders] = useState(remindersData);

  const handleDelete = (index) => {
    setReminders(reminders.filter((_, i) => i !== index));
    setShowDelete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 relative">
      {/* Create Reminder Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="w-full py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-orange-500 to-purple-500"
        onClick={() => setShowModal(true)}
      >
        Create Reminder
      </motion.button>

      {/* Reminder List */}
      <div className="mt-6 space-y-4">
        {reminders.map((reminder, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="flex items-center bg-gray-800 p-4 rounded-lg gap-4"
          >
            <img src={reminder.img} alt={reminder.category} className="w-16 h-16 rounded-lg" />
            <div className="flex-1">
              <p className="text-lg font-semibold">{reminder.title}</p>
              <p className="text-sm text-gray-400">{reminder.category}</p>
              <p className="text-sm text-gray-400">{reminder.time}</p>
            </div>
            <button
              className="bg-purple-600 px-3 py-1 rounded-md"
              onClick={() => setShowDelete(true)}
            >
              Delete Reminder
            </button>
          </motion.div>
        ))}
      </div>

      {/* Create Reminder Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-lg text-black w-80">
            <h2 className="text-lg font-semibold">Create Reminder</h2>
            <div className="mt-4 space-y-3">
              <select className="w-full p-2 border rounded-md">
                <option>Meal Logging</option>
                <option>Workout</option>
              </select>
              <select className="w-full p-2 border rounded-md">
                <option>Jollof Rice</option>
                <option>Bicep Curl</option>
              </select>
              <input type="time" className="w-full p-2 border rounded-md" />
            </div>
            <div className="flex justify-between mt-4">
              <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="bg-orange-500 px-4 py-2 rounded-md text-white">Save</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Delete Confirmation Modal */}
      {showDelete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-lg text-black w-80 text-center">
            <h2 className="text-lg font-semibold">This Reminder Will Be Deleted</h2>
            <div className="flex justify-between mt-4">
              <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={() => setShowDelete(false)}>Cancel</button>
              <button className="bg-orange-500 px-4 py-2 rounded-md text-white" onClick={() => handleDelete(0)}>Ok</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 flex justify-around text-gray-400">
        {[FaHome, FaUtensils, FaClipboardList, FaChartLine, FaUser].map((Icon, idx) => (
          <motion.div whileTap={{ scale: 0.8 }} key={idx}>
            <Icon className="text-2xl" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReminderPage;
    