import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/home");
    } catch (error) {
      alert("Invalid login credentials");
    }
  };

  const handleSubscribeRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="auth-content">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              id="email-usuario"
              className="form-control rounded-3"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="nome@exemplo.com.br"
            />
            <label htmlFor="email-usuario">Email:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              id="senha-usuario"
              className="form-control rounded-3"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="senha-usuario">Password:</label>
          </div>
          <div className="button-container">
            <button type="submit" className="bg-dark text-white m-3">
              Submeter
            </button>
            <button
              type="button"
              className="bg-primary text-white"
              onClick={handleSubscribeRedirect}
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
