import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../hook/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const loadingAuth = useSelector((state) => state.auth.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Email validation
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    // Password validation
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        email,
        password,
      };

      await handleLogin(
        payload,
        setError,
        setSuccess,
        setLoading,
        navigate
      );

      navigate("/home");

    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Already logged in
  if (!loadingAuth && user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-sky-400">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-300">
            Login to continue to your account.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl">

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent" />

          <div className="relative p-6 sm:p-7">

            <form onSubmit={handleSubmit} className="space-y-5">

              {error && (
                <div
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                  role="alert"
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
                  role="status"
                >
                  {success}
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-200"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-sky-500/60 focus:ring-4 focus:ring-sky-500/20"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-200"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-sky-500/60 focus:ring-4 focus:ring-sky-500/20"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-red-500/30 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {/* Register */}
              <div className="text-center text-sm text-slate-300">
                Don&apos;t have an account?{" "}

                <Link
                  to="/register"
                  className="font-semibold text-sky-300 hover:text-sky-200"
                >
                  Register
                </Link>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;