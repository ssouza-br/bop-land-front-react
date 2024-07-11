import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestInstance } from "../services/axiosService";
import Cookies from "universal-cookie";

interface User {
  id: number;
  nome: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const cookies = new Cookies();

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      // Create a FormData object and append the credentials
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      // Send the login request with the form data
      const response = await requestInstance.post("auth/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Retrieve user data after successful login
      const whoAmI = await requestInstance.get("auth/quemeusou");
      setUser(whoAmI.data);

      // Navigate to home or another protected route
      navigate("/home");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        window.alert(`Erro: ${error.response.data.message}`);
      } else {
        console.log({ error });
        window.alert("Ocorreu um erro inesperado");
      }
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      await requestInstance.post("auth/logout");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        window.alert(`Erro: ${error.response.data.message}`);
      } else {
        console.log({ error });
        window.alert("Ocorreu um erro inesperado");
      }
    }
    navigate("/"); // Redirect to login or homepage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
