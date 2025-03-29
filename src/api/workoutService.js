export const generateWorkoutRecommendations = async () => {
    try {
      const API_KEY = "AIzaSyARJuWtKWtkZC7X5bjDA6WGkrqA6t_-5E0";
      const prompt = `Generate 6 Nigerian-friendly workouts with:
      - Name
      - Duration
      - Calories burned
      - Equipment needed
      Format as JSON array like:
      [{"title":"...","duration":"...","calories":...,"equipment":[...]}]`;
  
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
      return JSON.parse(textResponse.replace(/```json|```/g, ''));
    } catch (error) {
      console.error("Workout API Error:", error);
      return [];
    }
  };