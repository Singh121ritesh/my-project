import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // Demo API simulation
      await new Promise((r) => setTimeout(r, 800));

      setLoading(false);

      setSuccess(
        "Account created successfully (demo). You can now log in."
      );
    } catch (err) {
      setLoading(false);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-red-400">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-slate-300">
            Join with your details to get started.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl">
          
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent" />

          <div className="relative p-6 sm:p-7">
            <form onSubmit={handleSubmit} className="space-y-5">

              {error ? (
                <div
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                  role="alert"
                >
                  {error}
                </div>
              ) : null}

              {success ? (
                <div
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
                  role="status"
                >
                  {success}
                </div>
              ) : null}

              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-slate-200"
                >
                  Username
                </label>

                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="yourname"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-red-500/60 focus:ring-4 focus:ring-red-500/20"
                />
              </div>

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
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-red-500/60 focus:ring-4 focus:ring-red-500/20"
                />
              </div>

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
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-red-500/60 focus:ring-4 focus:ring-red-500/20"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-red-500/30 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Creating..." : "Register"}
              </button>

              <div className="text-center text-sm text-slate-300">
                Already have an account?{" "}

                <Link
                  to="/"
                  className="font-semibold text-red-300 hover:text-red-200"
                >
                  Log in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;