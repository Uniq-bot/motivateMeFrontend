import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Register from "./Page/Register";
import Feed from "./Page/Feed";
import Login from "./Page/Login";
import { AuthContext } from "./Contexts/AuthContext";
import { getProfile } from "./utils/api";

const AppRoutes = () => {
  const { isLoggedIn, setUser, setIsLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // wait until check finishes
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("motiToken");
      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        const { user } = await getProfile(token);
        setUser(user);
        setIsLoggedIn(true);
      } catch (err) {
        console.log("Token invalid or user not found", err);
        localStorage.removeItem("motiToken");
        localStorage.removeItem("user");

        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [setUser, setIsLoggedIn]);

  useEffect(() => {
    if (loading) return; // wait for the profile check

    if (isLoggedIn) {
      // logged-in users shouldn't go to login/register
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate("/feed", { replace: true });
      }
    } else {
      // not logged-in users shouldn't access feed
      if (location.pathname === "/feed") {
        navigate("/login", { replace: true });
      }
    }
  }, [isLoggedIn, location.pathname, navigate, loading]);

  if (loading) return <div className="text-white p-10">Loading...</div>; // optional loading screen

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/feed" element={<Feed />} />
    </Routes>
  );
};

const App = () => {
  return (
    <div className="w-full lg:w-120 m-auto h-screen bg-gray-900">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
