import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const stepOneSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().min(5, "Password must be at least 5 characters").required("Password is required"),
});

const stepTwoSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup.number().positive().integer().required("Age is required"),
  height: yup.number().positive().required("Height is required"),
  weight: yup.number().positive().required("Weight is required"),
  bmi: yup.number().positive().required("BMI is required"),
  healthGoal: yup.string().required("Health goal is required"),
  dailyWaterIntake: yup.number().positive().required("Daily water intake is required"),
});

export default function MultiStepRegistration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step === 1 ? stepOneSchema : stepTwoSchema),
  });

  const onNext = (data) => {
    setFormData({ ...formData, ...data });
    setStep(2);
  };

  const onSubmit = (data) => {
    const finalData = { ...formData, ...data };
    console.log("Final Submission:", finalData);
    
    // Replace with your API request
    fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 shadow-md rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4">{step === 1 ? "Account Info" : "Health Info"}</h2>
      
      <form onSubmit={handleSubmit(step === 1 ? onNext : onSubmit)}>
        {step === 1 ? (
          <>
            <input {...register("email")} placeholder="Email" className="input" />
            <p className="text-red-500">{errors.email?.message}</p>

            <input {...register("username")} placeholder="Username" className="input" />
            <p className="text-red-500">{errors.username?.message}</p>

            <input type="password" {...register("password")} placeholder="Password" className="input" />
            <p className="text-red-500">{errors.password?.message}</p>

            <button type="submit" className="btn-primary">Next</button>
          </>
        ) : (
          <>
            <input {...register("name")} placeholder="Full Name" className="input" />
            <p className="text-red-500">{errors.name?.message}</p>

            <input type="number" {...register("age")} placeholder="Age" className="input" />
            <p className="text-red-500">{errors.age?.message}</p>

            <input type="number" {...register("height")} placeholder="Height (cm)" className="input" />
            <p className="text-red-500">{errors.height?.message}</p>

            <input type="number" {...register("weight")} placeholder="Weight (kg)" className="input" />
            <p className="text-red-500">{errors.weight?.message}</p>

            <input type="number" {...register("bmi")} placeholder="BMI" className="input" />
            <p className="text-red-500">{errors.bmi?.message}</p>

            <select {...register("healthGoal")} className="input">
              <option value="">Select Health Goal</option>
              <option value="Lose Weight">Lose Weight</option>
              <option value="Gain Muscle">Gain Muscle</option>
              <option value="Maintain Weight">Maintain Weight</option>
            </select>
            <p className="text-red-500">{errors.healthGoal?.message}</p>

            <input type="number" {...register("dailyWaterIntake")} placeholder="Daily Water Intake (L)" className="input" />
            <p className="text-red-500">{errors.dailyWaterIntake?.message}</p>

            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(1)} className="btn-secondary">Back</button>
              <button type="submit" className="btn-primary">Submit</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
