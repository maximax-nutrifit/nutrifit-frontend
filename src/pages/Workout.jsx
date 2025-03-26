import { useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const workouts = [
  { id: 1, title: "Push-ups", duration: "30 mins", calories: 200, img: "/assets/bicep-curl.png" },
  { id: 2, title: "Jump Rope", duration: "15 mins", calories: 150, img: "/assets/bicep-curl.png" },
  { id: 3, title: "Squats", duration: "20 mins", calories: 180, img: "/assets/bicep-curl.png" },
];

export default function WorkoutDetailPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredWorkouts = workouts.filter((workout) =>
    workout.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen mb-18 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-4">
      <div className="flex items-center gap-2 mt-4 bg-gray-700 p-2 rounded-lg">
        <div className="flex-1 flex items-center bg-gray-800 p-2 rounded-lg">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for workouts"
            className="bg-transparent flex-1 outline-none px-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && <X className="w-4 h-4 cursor-pointer" onClick={() => setSearch("")} />}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-6 grid grid-cols-2 gap-3"
      >
        {filteredWorkouts.map((workout) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={workout.id}
            className="bg-gray-800 p-2 rounded-lg relative"
          >
            <img src={workout.img} alt={workout.title} className="rounded-lg w-full h-24 object-cover" />
            <p className="text-sm font-semibold mt-2">{workout.title}</p>
            <p className="text-xs text-gray-400">{workout.duration} • {workout.calories} KCAL</p>
            <button 
              className="mt-2 bg-orange-500 text-xs px-3 py-1 rounded-lg w-full"
              onClick={() => navigate(`/workout/${workout.id}`)}
            >
              Start Workout
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
