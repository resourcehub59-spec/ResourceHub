import React, { useState } from "react";
import { formatPrice } from "../utils/format.js";
import supabase from "../lib/supabaseClient.js"; // ✅ make sure you have supabase client

export default function ItemCard({ item, onClick }) {
  if (!item.published) return null;

  // ✅ Start with clicks from DB (default 0)
  const [popularity, setPopularity] = useState(item.clicks || 0);

  const handleClick = async () => {
    // optional callback
    onClick?.(item.id);

    // instant UI feedback
    setPopularity((prev) => prev + 1);

    // ✅ Update clicks in Supabase
    const { error } = await supabase
      .from("items")
      .update({ clicks: popularity + 1 })
      .eq("id", item.id);

    if (error) {
      console.error("Failed to update clicks:", error.message);
      // rollback UI if DB update fails
      setPopularity((prev) => prev - 1);
    }
  };

  // ✅ Always normalize tags to array
  const tagsArray =
    typeof item.tags === "string"
      ? item.tags.split("|").map((t) => t.trim())
      : Array.isArray(item.tags)
      ? item.tags
      : [];

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="
        group block p-6 rounded-2xl
        bg-white dark:bg-backgroundDark
        border border-slate-200 dark:border-slate-700
        shadow-lg shadow-blue/20
        hover:shadow-blue/40
        hover:bg-slate-50 dark:hover:bg-slate-700
        transition transform hover:scale-105
      "
    >
      {/* Top Row: Type & Price */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="
            badge border border-blue-200 dark:border-blue-700
            capitalize bg-blue-100 text-blue-900
            dark:bg-blue-900 dark:text-blue-300
            px-2 py-1 text-xs font-medium rounded
          "
        >
          {item.type}
        </span>
        <span className="text-xs text-blue-700 dark:text-blue-300 font-semibold">
          {formatPrice(item.price)}
        </span>
      </div>

      {/* Title */}
      <div
        className="
          font-semibold line-clamp-2 group-hover:underline
          text-slate-900 dark:text-slate-100 mb-2
        "
      >
        {item.title}
      </div>

      {/* Description */}
      <div className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 mb-3">
        {item.description}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {tagsArray.slice(0, 4).map((t, idx) => (
          <span
            key={idx}
            className="
              badge border border-slate-300 dark:border-slate-600
              bg-slate-200 dark:bg-slate-700
              text-slate-800 dark:text-slate-300
              px-2 py-1 text-xs rounded
            "
          >
            {t}
          </span>
        ))}
      </div>

      {/* ✅ Real popularity */}
      <div className="text-xs text-slate-500 dark:text-slate-400">
        Popularity: {popularity}
      </div>
    </a>
  );
}
