// src/context/AuthProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import supabase from "../lib/supabaseClient";
const HAS_SUPABASE = Boolean(import.meta?.env?.VITE_SUPABASE_URL) && Boolean(import.meta?.env?.VITE_SUPABASE_ANON_KEY);
// MOCK AUTH: if no Supabase configured, expose a fake admin user for local demo
const DEMO_USER = { email: "admin@example.com" };

const AuthContext = createContext();
const ADMIN_EMAIL = "anupbaral.new@gmail.com";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => { if (!HAS_SUPABASE) return; if (!HAS_SUPABASE) { setUser(DEMO_USER); setLoading(false); } }, []);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { if (!HAS_SUPABASE) return;
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
      setLoading(false);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // ✅ redirect only after login, but NOT when already on /signup
  useEffect(() => { if (!HAS_SUPABASE) return;
    if (!loading && user) {
      if (location.pathname === "/signup") {
        if (user.email === ADMIN_EMAIL) navigate("/admin", { replace: true });
        else navigate("/", { replace: true });
      }
    }
  }, [user, loading, navigate, location]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
