import React, { useState } from "react";
import { LogIn, Mail, Lock, User } from "lucide-react";
import img1 from "../assets/google.png";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../firebase";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getFriendlyErrorMessage = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password is too weak.";
      case "auth/popup-closed-by-user":
        return "Google sign-in was cancelled.";
      default:
        return error.message || "An error occurred.";
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      console.log("Attempting signup with email:", formData.email); // Debug log
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });

      const uid = userCredential.user.uid;
      await setDoc(doc(db, "users", uid), {
        name: formData.name,
        email: formData.email,
        createdAt: new Date(),
        provider: "email",
      });
      navigate("/home");
      console.log("✅ Firestore document written for UID:", uid);
    } catch (err) {
      console.error("❌ Firestore write failed:", err.code, err.message);
      setError(getFriendlyErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google user email:", user.email); // Debug log
      const uid = user.uid;

      await setDoc(doc(db, "users", uid), {
        name: user.displayName || user.email.split("@")[0],
        email: user.email,
        createdAt: new Date(),
        provider: "google",
      });
      navigate("/home");
      console.log("✅ Firestore document written for UID:", uid);
    } catch (err) {
      console.error("❌ Firestore write failed:", err.code, err.message);
      setError(getFriendlyErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-[#0f172a]"
      style={{
        backgroundImage: `radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)`,
      }}
    >
    
      <div
        className="bg-white w-full rounded-none h-full md:w-[28rem] md:rounded-3xl shadow-lg flex flex-col justify-center items-center p-6 md:h-[35rem]"
        style={{
          backgroundImage: `radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)`,
        }}
      >
          {error && (
        <div className="w-full max-w-sm px-2 mb-2">
          <div className="bg-red-100 fixed top-6 left-1/2 transform -translate-x-1/2  text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all" role="alert">
            {error}
          </div>
        </div>
      )}
        <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center">
          <LogIn size={30} strokeWidth={2.75} />
        </div>
        <h1 className="text-2xl font-medium">Sign up with email</h1>
        <p className="text-[18px] text-center text-gray-500 md:text-sm">
          Type your name and email to create a Travel store account.
        </p>
        <form
          method="post"
          className="space-y-4 mt-2 w-full max-w-sm px-2"
          onSubmit={handleSubmit}
        >
          <div className="relative w-full">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="pl-10 pr-2 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-full text-gray-700 bg-white md:pr-4 md:py-2"
            />
          </div>
          <div className="relative w-full">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="pl-10 pr-2 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-full text-gray-700 bg-white md:pr-4 md:py-2"
              autoComplete="email"
            />
          </div>
          <div className="relative w-full">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="pl-10 pr-2 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-full text-gray-700 bg-white md:pr-4 md:py-2"
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex">
              <input type="checkbox" className="" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </div>
            <a href="/" className="text-sm text-gray-600">
              Forgot password?
            </a>
          </div>
          <button
            className="w-full bg-black/80 text-sm text-white p-2 rounded-xl"
            aria-label="Sign up with email"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
          <div className="relative flex items-center justify-center">
            <div className="flex-grow border-t border-dashed border-gray-300 h-[1px]"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium">
              Or sign up with
            </span>
            <div className="flex-grow border-t border-dashed border-gray-300 h-[1px]"></div>
          </div>
          <button
            className="w-full flex justify-center p-3 items-center bg-white rounded-xl"
            onClick={handleGoogleSignUp}
            disabled={loading}
            aria-label="Sign up with Google"
          >
            <img src={img1} alt="Google logo" className="w-8 pl-3" />
            <span className="text-sm text-gray-600 pl-2">
              Sign up with Google
            </span>
          </button>
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/signIn"
              className="text-black/80 hover:text-blue-800 font-medium transition"
            >
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;