import React from "react";
import Layout from "./layout";
import Dashboard from "./pages/dashboard";

const App: React.FC = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default App;
