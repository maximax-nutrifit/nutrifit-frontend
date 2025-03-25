import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-600 relative overflow-hidden">
      {/* Animated Cartoon Character */}
      {/* <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: [-10, 10, -10], opacity: 1 }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="relative"
      >
        <img
          src="../assets/Logo.png" // Replace with actual cartoon loader image
          alt="Loading..."
          className="w-48 h-48 md:w-64 md:h-64"
        />
      </motion.div> */}

      {/* Rotating Circular Loader */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 border-8 border-white border-t-transparent rounded-full animate-spin"
      ></motion.div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-20 text-white text-lg md:text-2xl font-semibold"
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default SplashScreen;
