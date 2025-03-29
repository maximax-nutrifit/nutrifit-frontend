import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { generateRecommendations } from "../api/generateRecommendations";
import { generateStabilityImage } from "../api/stabilityService";
import { FaBell, FaHome, FaChartLine, FaCog, FaCheck, FaUsers } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Local image fallbacks
const LOCAL_IMAGES = {
  'jollof rice': '/assets/jollof-rice.webp',
  'egusi soup': '/assets/egusi-soup.webp',
  'fried rice': '/assets/fried-rice.webp',
  'default': '/assets/food-placeholder.webp'
};

// Static fallback data
const staticRecommendations = [
  { img: "/assets/bicep-curl.png", title: "Bicep Curl", type: "exercise" },
  { img: LOCAL_IMAGES['jollof rice'], title: "Jollof Rice", type: "meal" },
  { img: "/assets/yoga.png", title: "Morning Yoga", type: "exercise" },
];

const chartData = [
  { name: "Jan", meals: 10, kcal: 15, steps: 5 },
  { name: "Feb", meals: 15, kcal: 10, steps: 8 },
  { name: "Mar", meals: 5, kcal: 25, steps: 6 },
  { name: "Apr", meals: 20, kcal: 12, steps: 10 },
  { name: "May", meals: 10, kcal: 18, steps: 7 },
];

const Dashboard = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failedGenerations, setFailedGenerations] = useState(0);

  const generateItemImage = async (itemName, itemType) => {
    try {
      const buffer = await generateStabilityImage(itemName, itemType);
      const blob = new Blob([buffer], { type: 'image/webp' });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error(`Failed to generate image for ${itemName}:`, error);
      setFailedGenerations(prev => prev + 1);
      return itemType === 'meal' 
        ? LOCAL_IMAGES[itemName.toLowerCase()] || '/assets/food-placeholder.webp'
        : '/assets/exercise-placeholder.png';
    }
  };
  
  // Update your useEffect to handle both types
  useEffect(() => {
    let isMounted = true;
  
    const loadRecommendations = async () => {
      const userData = JSON.parse(localStorage.getItem('userResponseDTO'));
      
      if (!userData || !isMounted) {
        setRecommendations(staticRecommendations);
        setLoading(false);
        return;
      }
  
      try {
        const aiRecommendations = await generateRecommendations(userData);
        if (!aiRecommendations || !isMounted) {
          setRecommendations(staticRecommendations);
          setLoading(false);
          return;
        }
  
        // Process all items in batches
        const batchSize = 3;
        const allItems = [
          ...aiRecommendations.meals.map(m => ({...m, type: 'meal'})),
          ...aiRecommendations.exercises.map(e => ({...e, type: 'exercise'}))
        ];
  
        const itemBatches = [];
        for (let i = 0; i < allItems.length; i += batchSize) {
          itemBatches.push(allItems.slice(i, i + batchSize));
        }
  
        const enhancedItems = [];
        for (const batch of itemBatches) {
          const batchResults = await Promise.all(
            batch.map(item => 
              generateItemImage(item.name, item.type).then(img => ({
                ...item,
                img,
                title: item.name
              }))
          ));
          enhancedItems.push(...batchResults);
          await new Promise(resolve => setTimeout(resolve, 500));
        }
  
        if (isMounted) {
          setRecommendations(enhancedItems);
        }
      } catch (error) {
        console.error('Loading failed:', error);
        if (isMounted) {
          setRecommendations(staticRecommendations);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
  
    loadRecommendations();
  
    return () => {
      isMounted = false;
    };
  }, [failedGenerations]);

  return (
    <div className="min-h-screen mb-12 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 space-y-6">
      {/* Progress Section */}
      <div className="bg-gray-800 p-5 rounded-xl shadow-lg w-full max-w-screen mx-auto">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-300">Your Progress</h3>
          <select 
            className="bg-gray-700 text-white rounded px-3 py-1 text-xs focus:outline-none"
            onChange={(e) => console.log("Timeframe changed:", e.target.value)}
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
          </select>
        </div>

        {/* Weekly Progress */}
        <div className="flex items-center gap-2 mt-3">
          {[1, 2, 3].map((day) => (
            <div 
              key={`completed-${day}`} 
              className="w-7 h-7 flex items-center justify-center bg-purple-500 text-white rounded-full"
            >
              <FaCheck size={12} />
            </div>
          ))}
          {[4, 5, 6, 7].map((day) => (
            <div 
              key={`pending-${day}`} 
              className="w-7 h-7 flex items-center justify-center bg-gray-700 text-gray-300 rounded-full text-xs"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="flex justify-between mt-4 text-center bg-gray-700 p-3 rounded-lg">
          <div>
            <p className="text-lg font-bold">20</p>
            <p className="text-xs text-gray-400">Meals logged</p>
          </div>
          <div>
            <p className="text-lg font-bold">1345</p>
            <p className="text-xs text-gray-400">KCAL</p>
          </div>
          <div>
            <p className="text-lg font-bold">5500</p>
            <p className="text-xs text-gray-400">Steps</p>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div>
        <p className="text-lg font-semibold mb-3">AI-recommended meals & workouts</p>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          // In your recommendations rendering section:
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {recommendations.map((item, idx) => (
              <motion.div
                whileHover={{ scale: 1.03 }}
                key={`${item.id || idx}-${item.type}`}
                className="bg-gray-800 p-3 rounded-2xl flex flex-col w-[180px] shadow-lg flex-shrink-0"
              >
                {/* Image Container */}
                <div className="relative aspect-square">
                  <img
                    src={item.img}
                    alt={item.name || item.title || 'Recommended item'}
                    className="rounded-xl w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = item.type === "meal" 
                        ? '/assets/food-placeholder.webp'
                        : '/assets/exercise-placeholder.png';
                    }}
                  />
                </div>
                
                {/* Text Container - Fixed to show full names */}
                <div className="mt-2 w-full px-2 pb-2">
                  <div className="flex flex-col min-h-[60px]">
                    {/* Name with proper wrapping */}
                    <p className="text-sm text-white break-words line-clamp-2 leading-tight min-h-[40px] flex items-center">
                      {item.name || item.title || 'New Recommendation'}
                    </p>
                    
                    {/* Type indicator */}
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-400 capitalize">
                        {item.type}
                      </span>
                      <span className="text-xs">
                        {item.type === "meal" ? "🥘" : "💪"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Health Advice Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="w-full mt-4 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-orange-500 to-purple-500 shadow-md hover:opacity-90 transition-opacity"
        onClick={() => console.log("Health advice clicked")}
      >
        Get Personalized Health Advice
      </motion.button>

      {/* Progress Chart */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-3">Weekly Progress Summary</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <XAxis 
              dataKey="name" 
              stroke="#aaa" 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#aaa" 
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#333", 
                color: "#fff",
                borderRadius: "0.5rem",
                border: "none"
              }}
            />
            <Line 
              type="monotone" 
              dataKey="meals" 
              stroke="#f97316" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="kcal" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="steps" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;