import React, { useState } from "react";
import img1 from "../assets/google.png";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../firebase";
import { LogIn, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getFriendlyErrorMessage = (error) => {
    switch (error.code) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Incorrect email or password.";
      case "auth/popup-closed-by-user":
        return "Google sign-in was cancelled.";
      default:
        return error.message || "An error occurred.";
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === "email" ? e.target.value.trim() : e.target.value,
    });
    setError("");
  };

  const handleEmailSignIn = async (e) => {
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

    try {
      console.log("Attempting sign-in with email:", formData.email); // Debug log
      const { user } = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("✅ Email sign-in success:", user.uid);
      navigate("/home");
    } catch (err) {
      console.error("❌ Sign-in failed:", err.code, err.message);
      setError(getFriendlyErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const uid = user.uid;

      // Check if user document exists in Firestore
      const userDoc = await getDoc(doc(db, "users", uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", uid), {
          name: user.displayName || user.email.split("@")[0], // Use `name` to match Signup and Profile
          email: user.email,
          createdAt: new Date(),
          provider: "google",
        });
        console.log("✅ Firestore document created for UID:", uid);
      } else {
        console.log("✅ Existing user signed in with UID:", uid);
      }
      navigate("/home");
    } catch (err) {
      console.error("❌ Google sign-in failed:", err.code, err.message);
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
        className="bg-white w-full h-full rounded-none md:w-[28rem] md:rounded-3xl shadow-lg flex flex-col justify-center items-center p-6 md:h-[35rem]"
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
        <h1 className="font-medium text-2xl">Sign in with email</h1>
        <p className="text-[18px] text-center text-gray-500 md:text-sm">
          Enter your email and password to access your Travel store account.
        </p>
        <form
          onSubmit={handleEmailSignIn}
          method="post"
          className="space-y-4 mt-2 w-full max-w-sm px-2"
        >
          <div className="relative w-full">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
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
              <input type="checkbox" className="w-4" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </div>
            <a href="/reset-password" className="text-sm text-gray-600 hover:text-blue-800">
              Forgot password?
            </a>
          </div>
          <button
            className="w-full bg-black/80 text-sm text-white p-2 rounded-xl mt-2"
            aria-label="Sign in with email"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <div className="relative flex items-center justify-center">
            <div className="flex-grow border-t border-dashed border-gray-300 h-[1px]"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium">
              Or sign in with
            </span>
            <div className="flex-grow border-t border-dashed border-gray-300 h-[1px]"></div>
          </div>
          <button
            className="w-full flex justify-center p-3 items-center bg-white rounded-xl"
            onClick={handleGoogleSignIn}
            disabled={loading}
            aria-label="Sign in with Google"
          >
            <img src={img1} alt="Google logo" className="w-8 pl-3" />
            <span className="text-sm text-gray-600 pl-2">
              Sign in with Google
            </span>
          </button>
          <div className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/signUp"
              className="text-black/80 hover:text-blue-800 font-medium transition"
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;