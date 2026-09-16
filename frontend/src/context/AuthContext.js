import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("nexvoro_token"));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("nexvoro_user");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Sync axios auth header whenever token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("nexvoro_token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("nexvoro_token");
      localStorage.removeItem("nexvoro_user");
    }
  }, [token]);

  // Verify token and fetch latest user info on mount
  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${API_BASE_URL}/api/auth/me`);
        if (res.data?.success && res.data?.user) {
          setUser(res.data.user);
          localStorage.setItem("nexvoro_user", JSON.stringify(res.data.user));
        }
      } catch (err) {
        console.warn("Session expired or invalid token:", err.response?.data?.error || err.message);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [token]);

  const login = async (identifier, password) => {
    const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      identifier,
      password,
    });
    if (res.data?.token) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("nexvoro_token", res.data.token);
      localStorage.setItem("nexvoro_user", JSON.stringify(res.data.user));
    }
    return res.data;
  };

  const demoLogin = async () => {
    const res = await axios.post(`${API_BASE_URL}/api/auth/demo-login`);
    if (res.data?.token) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("nexvoro_token", res.data.token);
      localStorage.setItem("nexvoro_user", JSON.stringify(res.data.user));
    }
    return res.data;
  };

  const register = async (userData) => {
    const res = await axios.post(`${API_BASE_URL}/api/auth/register`, userData);
    if (res.data?.token) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("nexvoro_token", res.data.token);
      localStorage.setItem("nexvoro_user", JSON.stringify(res.data.user));
    }
    return res.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("nexvoro_token");
    localStorage.removeItem("nexvoro_user");
    delete axios.defaults.headers.common["Authorization"];
  };

  const updateUserFunds = (newFunds) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, funds: newFunds };
      localStorage.setItem("nexvoro_user", JSON.stringify(updated));
      return updated;
    });
  };

  const refreshUser = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE_URL}/api/auth/me`);
      if (res.data?.success && res.data?.user) {
        setUser(res.data.user);
        localStorage.setItem("nexvoro_user", JSON.stringify(res.data.user));
      }
    } catch (err) {
      console.error("Failed to refresh user:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated: !!token && !!user,
        login,
        demoLogin,
        register,
        logout,
        updateUserFunds,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
