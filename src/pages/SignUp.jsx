import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { handleRegister } from "../api/authService";

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    special: false,
  });
  const [finalEmail, setFinalEmail] = useState("");
  const [finalUsername, setFinalUsername] = useState("");
  const [finalPassword, setFinalPassword] = useState("");

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const handleSignUp = (e) => {
    e.preventDefault(); // Prevent page refresh

    let newErrors = {};
    if (!Object.values(passwordValidations).every(Boolean)) {
      return;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep(2); // Transition to step 2 without reloading
    }
  };

  const onRegister = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (step !== 2) return; // Ensure it runs only on step 2

    const email = finalEmail;
    const username = finalUsername;
    const password = finalPassword;
    const name = e.target.name.value;
    const age = e.target.age.value;
    const gender = e.target.gender.value;
    const weight = e.target.weight.value;
    const height = e.target.height.value;
    const healthGoal = e.target.goal.value;
    const dietaryPreferences = e.target.dietaryPreferences.value;
    const activityLevel = e.target.activityLevel.value;
    const medicalConditions = e.target.medicalConditions.value;

    const registerData = {
      email,
      username,
      password,
      name,
      age,
      gender,
      weight,
      height,
      healthGoal,
      dietaryPreferences,
      activityLevel,
      medicalConditions,
    };

    try {
      const data = await handleRegister(registerData);
      if (data) {
        const { accessToken, refreshToken } = data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        console.log("Registration failed. Email/username already exists.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setFinalEmail(value);
    }
    if (name === "username") {
      setFinalUsername(value);
    }
    if (name === "password") {
      setPasswordValidations({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        special: /[\W_]/.test(value),
      });
      setFinalPassword(value);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg"
      >
        <div className="flex justify-between mb-6 bg-gray-700 p-1 rounded-full">
          <button
            className="w-1/2 py-2 rounded-full text-sm font-semibold transition-all text-gray-300"
            onClick={() => navigate("/login", { replace: true })}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-all ${
              step === 1 ? "bg-purple-500 text-white" : "text-gray-300"
            }`}
            onClick={() => setStep(1)}
          >
            Sign Up
          </button>
        </div>

        <motion.form
          className="login-form space-y-4"
          method="post"
          onSubmit={onRegister}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold text-center mb-4 text-white">
                Create an Account
              </h2>
              <input
                name="email"
                placeholder="Email"
                className="w-full p-3 rounded-md mb-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />
              <input
                name="username"
                placeholder="Username"
                className="w-full p-3 rounded-md mb-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />
              <div className="relative mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onChange={handleChange}
                />
                <span
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="relative mb-3">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onChange={handleChange}
                />
                <span
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.confirmPassword}
                </p>
              )}

              <div className="text-sm text-gray-400 space-y-1 mb-4">
                <p
                  className={`flex items-center ${
                    passwordValidations.length
                      ? "text-green-400"
                      : "text-gray-400"
                  }`}
                >
                  <FaCheckCircle
                    className={`mr-2 ${
                      passwordValidations.length
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />{" "}
                  At least 8 characters
                </p>
                <p
                  className={`flex items-center ${
                    passwordValidations.uppercase
                      ? "text-green-400"
                      : "text-gray-400"
                  }`}
                >
                  <FaCheckCircle
                    className={`mr-2 ${
                      passwordValidations.uppercase
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />{" "}
                  At least one uppercase letter
                </p>
                <p
                  className={`flex items-center ${
                    passwordValidations.lowercase
                      ? "text-green-400"
                      : "text-gray-400"
                  }`}
                >
                  <FaCheckCircle
                    className={`mr-2 ${
                      passwordValidations.lowercase
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />{" "}
                  At least one lowercase letter
                </p>
                <p
                  className={`flex items-center ${
                    passwordValidations.special
                      ? "text-green-400"
                      : "text-gray-400"
                  }`}
                >
                  <FaCheckCircle
                    className={`mr-2 ${
                      passwordValidations.special
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />{" "}
                  At least one special character
                </p>
              </div>

              <button
                type="button" // This prevents form submission on click
                className={`w-full py-3 rounded-full font-bold transition-all ${
                  Object.values(passwordValidations).every(Boolean)
                    ? "bg-purple-500 hover:bg-purple-600 text-white"
                    : "bg-gray-500 cursor-not-allowed text-gray-200"
                }`}
                disabled={!Object.values(passwordValidations).every(Boolean)}
                onClick={handleSignUp} // This now only moves to step 2
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold text-center mb-4 text-white">
                Personal Details
              </h2>
              <input
                name="name"
                placeholder="Name"
                className="w-full p-3 rounded-md mb-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
              <input
                name="age"
                type="number"
                placeholder="Age"
                className="w-full p-3 rounded-md mb-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />
              {errors.age && (
                <p className="text-red-500 text-sm">{errors.age}</p>
              )}
              <select
                name="gender"
                className="w-full p-3 rounded-md mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
              <input
                name="weight"
                type="number"
                placeholder="Weight (kg)"
                className="w-full p-3 rounded-md mb-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />
              {errors.weight && (
                <p className="text-red-500 text-sm">{errors.weight}</p>
              )}
              <input
                name="height"
                type="number"
                placeholder="Height (cm)"
                className="w-full p-3 rounded-md mb-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />
              {errors.height && (
                <p className="text-red-500 text-sm">{errors.height}</p>
              )}
              <select
                name="goal"
                className="w-full p-3 rounded-md mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              >
                <option value="">Select Fitness Goal</option>
                <option value="general_fitness">
                  Maintain Overall Well-being
                </option>
                <option value="weight_gain">Gain Weight</option>
                <option value="fat_loss">Lose Weight</option>
                <option value="muscle_building">Increase Muscle Mass</option>
                <option value="endurance_training">Improve Stamina</option>
                <option value="strength_training">
                  Focus on Strength/Powerlifting
                </option>
                <option value="rehabilitation">Injury Recovery</option>
                <option value="balanced_lifestyle">Balanced Lifestyle</option>
              </select>
              {errors.goal && (
                <p className="text-red-500 text-sm">{errors.goal}</p>
              )}
              <select
                name="dietaryPreferences"
                className="w-full p-3 rounded-md mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              >
                <option value="">Select Dietary Preference</option>
                <option value="vegan">Vegan</option>
                <option value="paleo">Paleo</option>
                <option value="keto">Keto</option>
                <option value="no_preference">No Preference</option>
              </select>
              {errors.dietaryPreferences && (
                <p className="text-red-500 text-sm">
                  {errors.dietaryPreferences}
                </p>
              )}
              <select
                name="activityLevel"
                className="w-full p-3 rounded-md mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              >
                <option value="">Select Activity Level</option>
                <option value="SEDENTARY">
                  Sedentary - Little to no exercise
                </option>
                <option value="LIGHT">
                  Lightly Active - Light exercise 1-3×/week
                </option>
                <option value="MODERATE">
                  Moderately Active - Exercise 3-5×/week
                </option>
                <option value="ACTIVE">
                  Active - Intense exercise 5-6×/week
                </option>
                <option value="VERY_ACTIVE">
                  Very Active - Daily intense exercise
                </option>
              </select>
              {errors.activityLevel && (
                <p className="text-red-500 text-sm">{errors.activityLevel}</p>
              )}
              <input
                name="medicalConditions"
                placeholder="Medical Conditions (if any)"
                className="w-full p-3 rounded-md mb-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />
              <button
                className="w-full py-3 rounded-full bg-purple-500 hover:bg-purple-600 font-bold text-white"
                type="submit"
              >
                Register
              </button>
            </>
          )}
        </motion.form>
      </motion.div>
    </div>
  );
};

export default SignUp;
