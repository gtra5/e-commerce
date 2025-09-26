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
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }
   
         

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    // Update profile with username
    await updateProfile(userCredential.user, {
      displayName: formData.username,
    });

    // Save additional user data to Firestore
    const uid = userCredential.user.uid;
    await setDoc(doc(db, "users", uid), {
      username: formData.username,
      email: formData.email,
      createdAt: new Date(),
      provider: "email",
    });
    navigate("/home")
    console.log("✅ Firestore document written for UID:", uid);
  } catch (err) {
    console.error("❌ Firestore write failed:", err.code, err.message);
    setError(err.message);
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
  const uid = user.uid;

  await setDoc(doc(db, "users", uid), {
    username: user.displayName || user.email.split("@")[0],
    email: user.email,
    createdAt: new Date(),
    provider: "google",
  });
   navigate("/home")
  console.log("✅ Firestore document written for UID:", uid);
} catch (err) {
  console.error("❌ Firestore write failed:", err.code, err.message);
  setError(err.message);
} finally {
      setLoading(false);
    }
  };

  return (
    <div
      className=" justify-center items-center flex  h-screen bg-[#0f172a]"
      style={{
        backgroundImage: `radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)`,
      }}
    >
      <header></header>
       {error && (
          <div className="w-full max-w-sm px-2 mb-2">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm" role="alert">
              {error}
            </div>
          </div>
        )}
      <div
        className="bg-white w-full h-full rounded-none md:w-110  md:rounded-3xl shadow-lg flex flex-col justify-center items-center p-6 md:h-140"
        style={{
          backgroundImage: `radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)`,
        }}
      >
        <div className="bg-white w-15 h-15 rounded-xl items-center justify-center flex">
          <LogIn size={30} strokeWidth={2.75} />
        </div>
        <h1 className="text-2xl font-medium  ">
          Sign up with email
        </h1>
        <p className="text-[18px] line-spacing-0 text-center  text-gray-500 md:text-sm">
          Type your username and e-mail to create a Travel store account.{" "}
        </p>
        <form
          
          method="post"
          className="space-y-4 mt-2 w-full max-w-sm px-2 "
          onSubmit={handleSubmit}
        >
          <div className="relative w-full ">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              className="pl-10 pr-2 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-full text-gray-700 bg-white md:pr-4 md:py-2"
            />
          </div>
          <div className="relative w-full  ">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="pl-10 pr-2 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-full text-gray-700 bg-white md:pr-4 md:py-2"
              autoComplete="email"
            />
          </div>
          <div className="relative w-full ">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 pr-2 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-full text-gray-700 bg-white md:pr-4 md:py-2"
              autoComplete="email"
            />
          </div>
          

          <div className="flex items-center justify-between">
            <div className="flex">
              <input type="checkbox" className="" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </div>
            <a href="/" className="text-sm text-gray-600">
              forget password
            </a>
          </div>
          <button className="w-full bg-black/80 text-sm text-white p-2 rounded-xl">
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
          <div class="relative flex items-center justify-center " style={{}}>
            <div class="flex-grow dotted-line h-[1px]"></div>
            <span class="flex-shrink mx-4 text-gray-500 text-sm font-medium">
              Or sign up with
            </span>
            <div class="flex-grow dotted-line h-[1px]"></div>
            
          </div>

          <button className="w-full flex justify-center p-3 items-center bg-white rounded-xl "
           onClick={handleGoogleSignUp}
                disabled={loading}>
            <img src={img1} alt="" className="w-8 pl-3" />
            <span className="text-sm text-gray-600 pl-2 ">
              Sign up with Google
            </span>
          </button>
          <div class="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signIn"
              class="text-black/80 hover:text-blue-800 font-medium transition"
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
