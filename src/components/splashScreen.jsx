import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import splash1 from "../assets/splash1.png";
import splash2 from "../assets/splash2.png";
import splash3 from "../assets/splash3.png";
import splash4 from "../assets/splash4.png";

const images = [splash1, splash2, splash3, splash4];

export default function SplashScreen({ onComplete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <motion.img
        key={index}
        src={images[index]}
        alt="Splash Screen"
        className="w-3/4 max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}
