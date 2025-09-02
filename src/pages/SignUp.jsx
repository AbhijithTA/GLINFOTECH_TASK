import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//  Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
    .required("Mobile is required"),
  dob: yup.date().required("Date of Birth is required"),
});

export default function Signup() {
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
      //  Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, { displayName: data.name });

      // Save extra details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        dob: data.dob,
        createdAt: new Date(),
      });

      // Redirect to products page
      navigate("/products");
    } catch (err) {
      console.error("Signup error:", err);
      setFirebaseError(err.message);
    }
  };

  return (
    <section className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-4">Signup</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            {...register("name")}
            className="mt-1 block w-full border rounded-lg px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

       
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

      
        <div>
          <label className="block text-sm font-medium">Mobile</label>
          <input
            type="text"
            {...register("mobile")}
            className="mt-1 block w-full border rounded-lg px-3 py-2"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile.message}</p>
          )}
        </div>

       
        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            {...register("dob")}
            className="mt-1 block w-full border rounded-lg px-3 py-2"
          />
          {errors.dob && (
            <p className="text-red-500 text-sm">{errors.dob.message}</p>
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
          {isSubmitting ? "Signing up..." : "Signup"}
        </button>
      </form>
    </section>
  );
}
