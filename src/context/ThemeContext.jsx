import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
const STORAGE_KEY = "ps:theme"; // ✅ match index.html

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark"); // ✅ default dark

  // Load preference on first mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial = stored || "dark"; // ✅ fallback dark
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  // Persist + reflect in <html> when theme changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () =>
    setTheme(t => (t === "dark" ? "light" : "dark")); // ✅ flipped

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
