import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const workouts = [
  { id: 1, title: "Push-ups", duration: "30:00", description: "Keep your body straight and lower yourself until your chest almost touches the floor. Push yourself back up and repeat.", img: "/assets/bicep-curl.png" },
  { id: 2, title: "Jump Rope", duration: "15:00", description: "Jump with both feet over the rope while maintaining rhythm and posture.", img: "/assets/bicep-curl.png" },
  { id: 3, title: "Squats", duration: "20:00", description: "Lower your body by bending your knees while keeping your chest up. Push back up and repeat.", img: "/assets/bicep-curl.png" },
];

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = workouts.find((w) => w.id === Number(id));

  if (!workout) return <div className="text-white text-center">Workout not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col">
      <motion.img
        src={workout.img}
        alt={workout.title}
        className="w-full h-60 object-cover rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="mt-4">
        <h1 className="text-2xl font-bold">{workout.title}</h1>
        <p className="text-gray-400 mt-2">{workout.duration}</p>
        <p className="mt-4 text-sm text-gray-300">{workout.description}</p>
      </div>

      <motion.button
        className="mt-auto bg-purple-500 text-white py-3 rounded-lg w-full text-center text-lg"
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
      >
        Finish Workout
      </motion.button>
    </div>
  );
}