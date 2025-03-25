import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, ChevronDown, X } from "lucide-react";

const meals = [
  { id: 1, title: "Jollof Rice", kcal: 200, macros: 50, img: "/assets/jollof-rice.png", people: 156 },
  { id: 2, title: "Jollof Rice", kcal: 200, macros: 50, img: "/assets/jollof-rice.png", people: 156 },
  { id: 3, title: "Jollof Rice", kcal: 200, macros: 50, img: "/assets/jollof-rice.png", people: 156 },
];

export default function MealPlanning() {
  const [search, setSearch] = useState("");

  const filteredMeals = meals.filter((meal) =>
    meal.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-4">
      <div className="flex items-center gap-2 mt-4 bg-gray-700 p-2 rounded-lg">
        <button className="bg-purple-500 px-3 py-1 rounded-lg flex items-center gap-1">
          None <ChevronDown className="w-4 h-4" />
        </button>
        <div className="flex-1 flex items-center bg-gray-800 p-2 rounded-lg">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for meals"
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
        {filteredMeals.map((meal) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={meal.id}
            className="bg-gray-800 p-2 rounded-lg relative"
          >
            <img src={meal.img} alt={meal.title} className="rounded-lg w-full h-24 object-cover" />
            <div className="absolute top-2 right-2 bg-white p-1 rounded-full">
              <Search className="w-4 h-4 text-gray-600" />
            </div>
            <p className="text-sm font-semibold mt-2">{meal.title}</p>
            <p className="text-xs text-gray-400">{meal.kcal} KCAL • {meal.macros} Macros</p>
            <button className="mt-2 bg-orange-500 text-xs px-3 py-1 rounded-lg w-full">Log Meal</button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
