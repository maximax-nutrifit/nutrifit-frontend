import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Clipboard, ChevronDown, X, CheckCircle } from "lucide-react";

// Dummy data for different sections
const categories = {
  "Recommended Meals": [
    { id: 1, title: "JRice", kcal: 200, macros: 50, img: "/assets/jollof-rice.png", people: 156 },
    { id: 2, title: "Fried Rice", kcal: 220, macros: 55, img: "/assets/jollof-rice.png", people: 180 },
  ],
  "Vegan": [
    { id: 4, title: "Vegan Salad", kcal: 150, macros: 40, img: "/assets/jollof-rice.png", people: 120 },
  ],
  "High Protein": [
    { id: 7, title: "Grilled Chicken", kcal: 300, macros: 70, img: "/assets/jollof-rice.png", people: 190 },
  ],
  "Low Carb": [
    { id: 10, title: "Zucchini Noodles", kcal: 130, macros: 30, img: "/assets/jollof-rice.png", people: 90 },
  ],
};

export default function MealPlanning() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalData, setModalData] = useState(null);
  const [logSuccess, setLogSuccess] = useState(false);

  const filteredMeals = selectedCategory === "All"
    ? Object.values(categories).flat()
    : categories[selectedCategory] || [];

  const searchedMeals = filteredMeals.filter(meal =>
    meal.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen mb-18 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-4">
      {/* Search & Filter */}
      <div className="flex items-center gap-2 mt-4 bg-gray-700 p-2 rounded-lg">
        <select
          className="bg-gray-800 px-3 py-1 rounded-lg text-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {Object.keys(categories).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
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

      {/* Meal Sections */}
      {Object.entries(categories).map(([category, meals]) => (
        (selectedCategory === "All" || selectedCategory === category) && (
          <div key={category} className="mt-6">
            <h2 className="text-lg font-semibold bg-gray-700 px-3 py-2 rounded-lg">{category}</h2>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
              {searchedMeals.filter(meal => meals.includes(meal)).map(meal => (
                <motion.div key={meal.id} className="bg-gray-800 p-3 rounded-lg relative shadow-lg">
                  <img src={meal.img} alt={meal.title} className="rounded-lg w-full h-28 object-cover" />
                  <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
                    <Clipboard className="w-4 h-4 text-gray-600 cursor-pointer" onClick={() => setModalData(meal)} />
                  </div>
                  <p className="text-sm font-semibold mt-2">{meal.title}</p>
                  <p className="text-xs text-gray-400">{meal.kcal} KCAL • {meal.macros} Macros</p>
                  <button onClick={() => setModalData(meal)} className="mt-2 bg-orange-500 text-xs px-3 py-2 rounded-lg w-full">Log Meal</button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )
      ))}

      {/* Grocery List Modal */}
      {modalData && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg w-80">
            <h2 className="text-lg font-bold">{modalData.title} Grocery List</h2>
            <ul className="mt-2">
              {modalData.title === "JRice" ? ["Tomatoes", "Onions", "Rice", "Chicken"] : ["Lettuce", "Carrots", "Dressing"].map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
            <button onClick={() => { setModalData(null); setLogSuccess(true); }} className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg w-full">Ok</button>
          </div>
        </div>
      )}

      {/* Meal Logged Success Modal */}
      {logSuccess && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg w-80 text-center">
            <CheckCircle className="text-green-500 w-10 h-10 mx-auto" />
            <p className="mt-4 text-lg font-bold">Your meal has been successfully logged</p>
            <button onClick={() => setLogSuccess(false)} className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg w-full">Ok</button>
          </div>
        </div>
      )}
    </div>
  );
}
