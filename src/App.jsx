// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import Admin from "./pages/Admin.jsx";
import NotFound from "./pages/NotFound.jsx";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";

import supabase from "./lib/supabaseClient.js";
import { api } from "./lib/api.js"; // ✅ use our centralized API

const ADMIN_EMAIL = "anupbaral.new@gmail.com"; // ✅ change if needed

export default function App() {
  const [data, setData] = useState({ items: [] });
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // ✅ Fetch items
  useEffect(() => {
    async function fetchItems() {
      console.log("📦 Fetching items from Supabase...");
      const { data: items, error } = await supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Error fetching items:", error);
      } else {
        console.log("✅ Items loaded:", items);
        setData({ items });
      }
    }
    fetchItems();
  }, []);

  // ✅ Auth listener
  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();
      const currentUser = data?.user || null;
      setUser(currentUser);

      if (currentUser) {
        const adminCheck =
          currentUser.user_metadata?.role === "admin" ||
          currentUser.email === ADMIN_EMAIL;
        setIsAdmin(adminCheck);
      }
      setLoading(false);
    }

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);

        if (currentUser) {
          const adminCheck =
            currentUser.user_metadata?.role === "admin" ||
            currentUser.email === ADMIN_EMAIL;
          setIsAdmin(adminCheck);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ✅ Published filter
  const visibleItems = isAdmin
    ? data.items
    : data.items.filter((i) => i.published);

  // ✅ Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} isAdmin={isAdmin} />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="flex-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          <Routes>
            {/* Home */}
            <Route
              path="/"
              element={<Home items={visibleItems} onClick={api.click} />}
            />

            {/* Catalogs */}
            <Route
              path="/catalog"
              element={
                <Catalog items={visibleItems} onClick={api.click} heading="All" />
              }
            />
            <Route
              path="/books"
              element={
                <Catalog
                  items={visibleItems.filter((i) => i.category === "Books")}
                  onClick={api.click}
                  heading="Books"
                />
              }
            />
            <Route
              path="/jobs"
              element={
                <Catalog
                  items={visibleItems.filter((i) => i.category === "Jobs")}
                  onClick={api.click}
                  heading="Jobs & Opportunities"
                />
              }
            />
            <Route
              path="/courses"
              element={
                <Catalog
                  items={visibleItems.filter((i) => i.type === "course")}
                  onClick={api.click}
                  heading="Courses"
                />
              }
            />


            {/* Admin */}
            <Route
              path="/admin"
              element={
                user ? (
                  isAdmin ? (
                    <Admin data={data} api={api} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Auth */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
