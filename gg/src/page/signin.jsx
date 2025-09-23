import React, { useState } from "react";
import img1 from "../assets/google.png";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../firebase";
import { LogIn, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const handleChange = (e) =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ---------- Email + Password ---------- */
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("✅ Email sign-in success:", user.uid);
      nav("/home"); // ← change to your route
    } catch (err) {
      console.error(err);
      setError(
        err.code === "This username/email does not exist"
          ? "Wrong email or password"
          : err.message
      );
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
       nav("/home"); // ← ch
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
      <div
        className="bg-white w-110 h-140 rounded-3xl shadow-lg flex flex-col justify-center items-center p-6"
        style={{
          backgroundImage: `radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)`,
        }}
      >
        <div className="bg-white w-15 h-15 rounded-xl items-center justify-center flex">
          <LogIn size={30} strokeWidth={2.75} />
        </div>
        <h1 className="text-lg font-medium md:text-2xl  ">
          Sign in with email
        </h1>
        <p className="text-sm line-spacing-0 text-center  text-gray-500">
          Type your username and e-mail to create a Travel store account.{" "}
        </p>

        <form
          onSubmit={handleEmailSignIn}
          method="post"
          className="space-y-4 mt-2 w-full max-w-sm px-2"
        >
          <div className="relative w-full ">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-full text-gray-700 bg-white"
              autoComplete="email"
            />
          </div>
          <div className="relative w-full ">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-full text-gray-700 bg-white"
              autoComplete="email"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex">
              <input type="checkbox" className="" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </div>
            <a href="" className="text-sm text-gray-600">
              forget password
            </a>
          </div>
 {error && <div className="text-sm text-red-600 text-center">{error}</div>}
          <button className="w-full bg-black/80 text-sm text-white p-2 rounded-xl">
            {loading ? "Signing in..." : "Sign up"}
          </button>
          <div class="relative flex items-center justify-center " style={{}}>
            <div class="flex-grow dotted-line h-[1px]"></div>
            <span class="flex-shrink mx-4 text-gray-500 text-sm font-medium">
              Or sign in with
            </span>
            <div class="flex-grow dotted-line h-[1px]"></div>
          </div>
          <button
            className="w-full flex justify-center p-3 items-center bg-white rounded-xl "
            onClick={handleGoogleSignUp}
            disabled={loading}
          >
            <img src={img1} alt="" className="w-8 pl-3" />
            <span className="text-sm text-gray-600 pl-2 ">
              Sign in with Google
            </span>
          </button>
          <div class="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signUp"
              class="text-black/80 hover:text-blue-800 font-medium transition"
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
