import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import CreateTest from "./pages/CreateTest";
import FollowupTest from "./pages/FollowupTest";
import BOP from "./pages/BOP";
import PrivateRoute from "./PrivateRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <div>
                <Sidebar />
                <div className="content">
                  <PrivateRoute>
                    <Routes>
                      <Route path="home" element={<Home />} />
                      <Route path="bops" element={<BOP />} />
                      <Route path="create-test" element={<CreateTest />} />
                      <Route path="followup-test" element={<FollowupTest />} />
                    </Routes>
                  </PrivateRoute>
                </div>
              </div>
            }
          ></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
