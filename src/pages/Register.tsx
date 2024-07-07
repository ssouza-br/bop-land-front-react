import React, { useState } from "react";
import { requestInstance } from "../services/axiosService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Subscribe = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create a FormData object and append the credentials
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      // Send the login request with the form data
      const response = await requestInstance.post("auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      login(email, password);
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

  return (
    <div className="auth-content">
      <div className="auth-form">
        <h2>Registre-se</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              id="nome-usuario"
              className="form-control rounded-3"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="nome-usuario">Nome:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              id="email-usuario"
              className="form-control rounded-3"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email-usuario">Email:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              id="password-usuario"
              className="form-control rounded-3"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password-usuario">Password:</label>
          </div>
          <button type="submit" className="bg-dark text-white">
            Submeter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
