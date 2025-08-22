import React, { useEffect } from "react";
import Layout from "./layout";
import Dashboard from "./pages/dashboard";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import ManageAccounts from "./pages/accounts";
import Signup from "./pages/signup";
import { useMainStore } from "./store";
import { useQuery } from "@tanstack/react-query";
import { coleAPI } from "./lib/utils";
import { Loader } from "lucide-react";

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useMainStore((state) => state.user);
  const { data, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: coleAPI("/auth/session"),
  });

  useEffect(() => {
    if (data) {
      useMainStore.getState().setLoggedIn(true);
      useMainStore.getState().setUser(data);
    }

    if (!isLoading && !data && !useMainStore.getState().user) {
      navigate("/login");
    }
  }, [data, isLoading]);

  useEffect(() => {
    switch (location.pathname) {
      case "/login":
        if (user) navigate("/");
    }
  }, [location.pathname, user, navigate]);

  if (isLoading)
    return (
      <div className="w-full h-dvh flex items-center justify-center">
        <Loader size={60} className="animate-spin text-primary" />
      </div>
    );

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<ManageAccounts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </Layout>
  );
};

export default App;
