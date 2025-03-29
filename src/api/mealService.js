export const generateMealRecommendations = async (category) => {
    try {
      const API_KEY = "AIzaSyARJuWtKWtkZC7X5bjDA6WGkrqA6t_-5E0";
      const prompt = `Generate 3 Nigerian ${category} meals with:
      - Name
      - Calories
      - Macros (as string in format "P:xxg C:xxg F:xxg")
      - Main ingredients
      Format as JSON array: 
      [{"title":"...","kcal":...,"macros":"...","ingredients":[...]}]`;
  
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );
  
      const data = await response.json();
      const textResponse = data.candidates[0].content.parts[0].text;
      const meals = JSON.parse(textResponse.replace(/```json|```/g, ''));
      
      // Ensure macros is always a string
      return meals.map(meal => ({
        ...meal,
        macros: typeof meal.macros === 'object' 
          ? `P:${meal.macros.protein}g C:${meal.macros.carbohydrates}g F:${meal.macros.fat}g`
          : meal.macros
      }));
    } catch (error) {
      console.error("Meal API Error:", error);
      return [];
    }
  };