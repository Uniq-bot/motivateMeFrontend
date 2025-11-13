import { createContext, useState, useEffect } from "react";
import { regiUser, logUser } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Register function
  const registerUser = async (formData) => {
    try {
      const data = await regiUser(formData);

      if (data?.user) {
        setUser(data.user);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(data.user)); // persist login
      }

      return data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  // Login function
  const loginUser = async (formData) => {
    try {
      const data = await logUser(formData);
      if (data?.user) {
        setUser(data.user);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(data.user)); // persist login
      }
      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Restore login on reload
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        registerUser,
        loginUser, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
