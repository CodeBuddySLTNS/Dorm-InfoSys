import React from "react";
import Dashboard from "./dashboard";
import { useMainStore } from "@/store";
import StudentPortal from "./student-portal";

const Homepage: React.FC = () => {
  const user = useMainStore((state) => state.user);

  if (user && user.role === "admin") {
    return <Dashboard />;
  } else {
    return <StudentPortal />;
  }
};

export default Homepage;
