import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateWorkoutRecommendations } from "../api/workoutService";

export default function WorkoutDetailPage() {
  const [search, setSearch] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userResponseDTO'));

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const generatedWorkouts = await generateWorkoutRecommendations(userData);
        setWorkouts(generatedWorkouts);
      } catch (error) {
        console.error("Failed to load workouts:", error);
      } finally {
        setLoading(false);
      }
    };
    loadWorkouts();
  }, []);

  const filteredWorkouts = workouts.filter((workout) =>
    workout.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen mb-18 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-4">
      {/* Search Bar */}
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

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      )}

      {/* Workout Grid */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6 grid grid-cols-2 gap-3"
        >
          {filteredWorkouts.map((workout, index) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={`${workout.title}-${index}`}
              className="bg-gray-800 p-2 rounded-lg relative"
            >
              <img 
                src={`/assets/${workout.title?.toLowerCase().replace(/\s+/g, '-')}.png`}
                alt={workout.title}
                className="rounded-lg w-full h-24 object-cover"
                onError={(e) => e.target.src = "/assets/workout-placeholder.png"}
              />
              <p className="text-sm font-semibold mt-2">{workout.title}</p>
              <p className="text-xs text-gray-400">
                {workout.duration} • {workout.calories} KCAL
              </p>
              <button
                className="mt-2 bg-orange-500 text-xs px-3 py-1 rounded-lg w-full"
                onClick={() => navigate(`/workout/${workout.title?.replace(/\s+/g, '-')}`)}
              >
                Start Workout
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}