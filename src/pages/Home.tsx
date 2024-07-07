import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Welcome to the Home Page, {user.nome}!!!</h1>
    </div>
  );
};

export default Home;
