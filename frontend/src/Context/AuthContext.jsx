import React, { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedRole = sessionStorage.getItem("role");
    const storedUser = sessionStorage.getItem("user");
     
    if (storedToken && storedRole && storedUser) {
      setToken(storedToken);
      setRole(storedRole);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Invalid user data in sessionStorage", e);
      }
    }
    setLoading(false);
  }, []);
    const logoutUser = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setRole(null);

    console.log("User logged out & session cleared!");
  };

  return (
    <AuthContext.Provider value={{ token, role, user, loading,logoutUser  }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};      
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};