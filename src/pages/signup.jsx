// src/pages/Signup.jsx
import { useState } from "react";
import supabase from "../lib/supabaseClient";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role: "user" } },
    });
    if (error) alert(error.message);
    else alert("Check your email for confirmation link!");
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-700 to-black px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 dark:text-indigo-400">
          Create Account
        </h1>
        <p className="mt-2 text-center text-slate-500 dark:text-slate-400">
          Join ResourceHub today
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
          className="mt-6 space-y-4"
        >
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-3 text-slate-900 dark:text-slate-100"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-3 text-slate-900 dark:text-slate-100"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
