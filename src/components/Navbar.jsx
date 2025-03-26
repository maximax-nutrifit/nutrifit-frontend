import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaUtensils, FaClipboardList, FaChartLine, FaUser } from "react-icons/fa";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed bottom-0 w-full bg-gray-800 text-white flex justify-around py-3 shadow-lg"
    >
      {[
        { to: "/dashboard", icon: <FaHome /> },
        { to: "/meal-planning", icon: <FaUtensils /> },
        { to: "/workout", icon: <FaChartLine /> },
        { to: "/reminder", icon: <FaClipboardList /> },
        { to: "/settings", icon: <FaUser /> },
      ].map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className={({ isActive }) =>
            `nav-item flex items-center justify-center w-12 h-12 rounded-full transition-all 
            ${isActive ? "bg-purple-500" : "bg-gray-700"}`
          }
        >
          <motion.div
            whileHover={{ scale: 1.2, opacity: 0.9 }}
            transition={{ duration: 0.3 }}
            className="text-2xl"
          >
            {item.icon}
          </motion.div>
        </NavLink>
      ))}
    </motion.nav>
  );
}

export default Navbar;
