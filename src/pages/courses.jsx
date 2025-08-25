import React, { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";
import ItemCard from "../components/ItemCard";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      console.log("📦 Fetching courses from Supabase...");
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("type", "course")
        .eq("published", true);

      if (error) {
        console.error("❌ Error fetching courses:", error.message);
      } else {
        console.log("✅ Courses loaded:", data);
        setCourses(data || []);
      }
      setLoading(false);
    }

    fetchCourses();
  }, []);

  if (loading) return <p className="p-6">Loading courses...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Courses Page 🎓</h1>
      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <ItemCard key={course.id} item={course} />
          ))}
        </div>
      )}
    </div>
  );
}
