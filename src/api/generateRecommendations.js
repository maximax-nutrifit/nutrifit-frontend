// utils/generateRecommendations.js
const API_KEY = "AIzaSyARJuWtKWtkZC7X5bjDA6WGkrqA6t_-5E0";

export const generateRecommendations = async (userData) => {
  try {
    const prompt = `Generate 3 Nigerian meals and 3 exercises for:
      Name: ${userData.name}
      BMI: ${userData.bmi}
      Goal: ${userData.healthGoal}
      Diet: ${userData.dietaryPreferences}
      Format as valid JSON without markdown code blocks. Example:
      {
        "meals": [{"name":"Egusi Soup","description":"...","calories":"..."}],
        "exercises": [{"name":"Jump Rope","description":"..."}]
      }`;

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

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    
    // Safely extract the text response
    const textResponse = responseData?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResponse) {
      throw new Error("Invalid API response structure");
    }

    // Clean the response (remove markdown code blocks if present)
    const cleanResponse = textResponse.replace(/```json|```/g, '').trim();
    
    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error("Gemini API error:", error);
    return {
      meals: [
        { name: "Jollof Rice", description: "Classic Nigerian rice dish", calories: "450" },
        { name: "Egusi Soup", description: "Melon seed soup with vegetables", calories: "380" },
        { name: "Moi Moi", description: "Steamed bean pudding", calories: "320" }
      ],
      exercises: [
        { name: "Jump Rope", description: "15 minutes of rope jumping", duration: "15 mins" },
        { name: "Brisk Walking", description: "30 minute walk", duration: "30 mins" },
        { name: "Bodyweight Squats", description: "3 sets of 12 reps", duration: "10 mins" }
      ]
    };
  }
};