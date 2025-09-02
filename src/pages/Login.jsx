// src/pages/Login.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//  Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setFirebaseError("");
    try {
      // 1️⃣ Sign in with Firebase
      await signInWithEmailAndPassword(auth, data.email, data.password);

      // 2️⃣ Redirect to products
      navigate("/products");
    } catch (err) {
      console.error("Login error:", err);
      setFirebaseError("Invalid email or password");
    }
  };

  return (
    <section className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 block w-full border rounded-lg px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

  
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 block w-full border rounded-lg px-3 py-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

 
        {firebaseError && (
          <p className="text-red-500 text-sm">{firebaseError}</p>
        )}

    
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4">
        Don’t have an account?{" "}
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Signup
        </span>
      </p>
    </section>
  );
}
