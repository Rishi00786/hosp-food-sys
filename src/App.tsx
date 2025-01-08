import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Manager_Dashboard from "./components/Manager_Dashboard";
import Pantry_Dashboard from "./components/Pantry_Dashboard";
import Delivery_Dashboard from "./components/Delivery_Dashboard";

const App = () => {
  const person = localStorage.getItem("person");

  const PrivateRoute = ({ children, role }: { children: React.ReactNode, role: string }) => {
    return person === role ? (
      <>{children}</>
    ) : (
      <Navigate to="/" />
    );
  };

  return (
    <Router>
      <div className="w-[100vw] min-h-[100vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <Routes>

          <Route path="/" element={<Login />} />

          <Route
            path="/Manager_Dashboard"
            element={
              <PrivateRoute role="manager">
                <Manager_Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/Pantry_Dashboard"
            element={
              <PrivateRoute role="pantry">
                <Pantry_Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/Delivery_Dashboard"
            element={
              <PrivateRoute role="delivery">
                <Delivery_Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
