import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Clipboard, X, CheckCircle } from "lucide-react";
import { generateMealRecommendations } from "../api/mealService";

const initialCategories = {
  "Recommended Meals": [],
  "Vegan": [],
  "High Protein": [],
  "Low Carb": []
};

export default function MealPlanning() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalData, setModalData] = useState(null);
  const [logSuccess, setLogSuccess] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(true);

  const userData = JSON.parse(localStorage.getItem('userResponseDTO'));

  const formatMacros = (macros) => {
    if (!macros) return 'Macros not available';
    if (typeof macros === 'string') return macros;
    return `P:${macros.protein || 0}g C:${macros.carbohydrates || 0}g F:${macros.fat || 0}g`;
  };

  const loadRecommendations = useCallback(async () => {
    setLoading(true);
    const newCategories = { ...initialCategories };

    try {
      for (const category of Object.keys(newCategories)) {
        newCategories[category] = await generateMealRecommendations(category, userData);
      }
      setCategories(newCategories);
    } catch (error) {
      console.error("Failed to load recommendations:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecommendations();
  }, [loadRecommendations]);

  const filteredMeals = selectedCategory === "All"
    ? Object.values(categories).flat()
    : categories[selectedCategory] || [];

  const searchedMeals = filteredMeals.filter(meal =>
    meal.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen mb-18 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-4">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 bg-gray-700 p-3 rounded-lg w-full">
        <select
          className="bg-gray-800 px-3 py-2 rounded-lg text-white w-full sm:w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {Object.keys(categories).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <div className="flex items-center bg-gray-800 p-2 rounded-lg w-full">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for meals"
            className="bg-transparent flex-1 outline-none px-2 text-white placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && <X className="w-5 h-5 cursor-pointer text-gray-400" onClick={() => setSearch("")} />}
        </div>
      </div>


      {/* Loading State */}
      {loading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      )}

      {/* Meal Sections */}
      {!loading && Object.entries(categories).map(([category, meals]) => (
        (selectedCategory === "All" || selectedCategory === category) && (
          <div key={category} className="mt-6">
            <h2 className="text-lg font-semibold bg-gray-700 px-3 py-2 rounded-lg">{category}</h2>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
              {searchedMeals.filter(meal => meals.includes(meal)).map((meal, index) => (
                <motion.div
                  key={`${meal.title}-${index}`}
                  className="bg-gray-800 p-3 rounded-lg relative shadow-lg"
                  whileHover={{ scale: 1.03 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={`/assets/${meal.title?.toLowerCase().replace(/\s+/g, '-')}.png`}
                      alt={meal.title}
                      className="rounded-lg w-full h-28 object-cover"
                      onError={(e) => e.target.src = "/assets/food-placeholder.png"}
                    />
                  </motion.div>
                  <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
                    <Clipboard className="w-4 h-4 text-gray-600 cursor-pointer"
                      onClick={() => setModalData(meal)}
                    />
                  </div>
                  <p className="text-sm font-semibold mt-2">{meal.title}</p>
                  <p className="text-xs text-gray-400">
                    {meal.kcal} KCAL • {formatMacros(meal.macros)}
                  </p>
                  <button
                    onClick={() => setModalData(meal)}
                    className="mt-2 bg-orange-500 text-xs px-3 py-2 rounded-lg w-full"
                  >
                    Log Meal
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )
      ))}

      {/* Modals (same as before) */}
      {modalData && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg w-80">
            <h2 className="text-lg font-bold">{modalData.title} Grocery List</h2>
            <ul className="mt-2">
              {modalData.ingredients?.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
            <button
              onClick={() => { setModalData(null); setLogSuccess(true); }}
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Ok
            </button>
          </div>
        </div>
      )}

      {logSuccess && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg w-80 text-center">
            <CheckCircle className="text-green-500 w-10 h-10 mx-auto" />
            <p className="mt-4 text-lg font-bold">Meal logged successfully!</p>
            <button
              onClick={() => setLogSuccess(false)}
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
}