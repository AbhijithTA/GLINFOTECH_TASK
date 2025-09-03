// src/pages/Login.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fireBaseConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import loginPoster from "../../public/Login/poster.jpg";
import { showSuccess } from "../utils/toast";

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
     
      await signInWithEmailAndPassword(auth, data.email, data.password);
      showSuccess("Login successful!");
      navigate("/products");
    } catch (err) {
      console.error("Login error:", err);
      setFirebaseError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      
      <div className="hidden lg:flex lg:w-1/2 relative">
        
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <img
            src={loginPoster}
            alt="Login poster"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-md">
         
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Welcome Back!!
            </h1>
            <p className="text-gray-500 text-sm">Please Login your account</p>
          </div>

          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="admin@gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

           
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Forgot Password
              </button>
            </div>

          
            {firebaseError && (
              <p className="text-red-500 text-sm">{firebaseError}</p>
            )}

           
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

         
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

         
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Didn't have an A ccount?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign-up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
