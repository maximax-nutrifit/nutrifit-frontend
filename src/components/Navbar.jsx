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
      <NavLink to="/dashboard" className="nav-item">
        <FaHome className="text-2xl transition-transform duration-300 hover:scale-110" />
      </NavLink>
      <NavLink to="/meal-planning" className="nav-item">
        <FaUtensils className="text-2xl transition-transform duration-300 hover:scale-110" />
      </NavLink>
      <NavLink to="/reminder" className="nav-item">
        <FaClipboardList className="text-2xl transition-transform duration-300 hover:scale-110" />
      </NavLink>
      <NavLink to="/workout" className="nav-item">
        <FaChartLine className="text-2xl transition-transform duration-300 hover:scale-110" />
      </NavLink>
      <NavLink to="/settings" className="nav-item">
        <FaUser className="text-2xl transition-transform duration-300 hover:scale-110" />
      </NavLink>
    </motion.nav>
  );
}

export default Navbar;
