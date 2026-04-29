// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowRight, Loader, LogIn } from "lucide-react";
import { useState } from "react";
import useStore from "../store/useStore.js";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { login, loading } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-4">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >

        {/* CARD */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-8">

          {/* TITLE */}
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-400 text-center text-sm mb-6">
            Sign in to your account to continue
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="you@example.com"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition
              ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500"
              } text-white`}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={18} />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>

          </form>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-green-400 hover:text-green-300 font-medium inline-flex items-center gap-1"
            >
              Sign Up <ArrowRight size={14} />
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;