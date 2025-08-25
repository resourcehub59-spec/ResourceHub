import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";
import { useTheme } from "../context/ThemeContext.jsx";

const ADMIN_EMAIL = "anupbaral.new@gmail.com"; // ✅ your admin email
const HAS_SUPABASE = Boolean(import.meta?.env?.VITE_SUPABASE_URL) && Boolean(import.meta?.env?.VITE_SUPABASE_ANON_KEY);

export default function Navbar({ user: appUser, isAdmin: appIsAdmin }) {
  const [user, setUser] = useState(appUser || null);
  const [isAdmin, setIsAdmin] = useState(appIsAdmin || false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();


  const { pathname } = useLocation();
  useEffect(() => {
    if (!HAS_SUPABASE) {
      setIsAdmin((appUser?.email || "") === ADMIN_EMAIL);
      return;
    }
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsAdmin((user?.email || "") === ADMIN_EMAIL);
    }
    getUser();
  }, [appUser]);

  const NavLinks = () => (
    <>
      <Link to="/" className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Home</Link>
      <Link to="/catalog" className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Catalog</Link>
      <Link to="/books" className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Books</Link>
      <Link to="/courses" className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Courses</Link>
      <Link to="/jobs" className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Jobs</Link>
      {isAdmin && pathname === '/' && <Link to="/admin" className="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">Admin</Link>}
    </>
  );

  return (
    <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur sticky top-0 z-50">
      <div className="container flex items-center justify-between py-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2 ring-1 ring-slate-200 dark:ring-slate-800"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {/* hamburger */}
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault(); // prevent normal router nav
              window.location.href = "/"; // force full refresh
            }}
          >
            📚 ResourceHub
          </Link>

        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <NavLinks />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 ring-1 ring-slate-200 dark:ring-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M21.64 13A9 9 0 1 1 11 2.36a7 7 0 1 0 10.66 10.64z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
            )}
            <span className="hidden sm:inline text-sm">{theme === "dark" ? "Dark" : "Light"}</span>
          </button>

          {/* Auth buttons */}
          {HAS_SUPABASE && user ? (
            <span className="text-sm text-slate-600 dark:text-slate-300">Hi, {user.email}</span>
          ) : HAS_SUPABASE ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className="px-3 py-2 rounded ring-1 ring-slate-200 dark:ring-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800">
                Login
              </Link>
              <Link to="/signup" className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                Signup
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      {/* Mobile panel */}
      <div className={`md:hidden border-t border-slate-200 dark:border-slate-800 ${open ? "block" : "hidden"}`}>
        <div className="container py-3 flex flex-col gap-2">
          <NavLinks />
          {HAS_SUPABASE && !user && (
            <div className="flex gap-2 pt-2">
              <Link to="/login" className="flex-1 px-3 py-2 rounded ring-1 ring-slate-200 dark:ring-slate-800 text-center">Login</Link>
              <Link to="/signup" className="flex-1 px-3 py-2 rounded bg-blue-600 text-white text-center">Signup</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

