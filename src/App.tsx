import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Manager_Dashboard from "./components/Manager_Dashboard";
import Pantry_Dashboard from "./components/Pantry_Dashboard";
import Delivery_Dashboard from "./components/Delivery_Dashboard";
import { useStateContext } from "../context";

interface Meals {
  id: string;
  userId: string;
  morningMealIng: Record<string, unknown>;
  nightMealIng: Record<string, unknown>;
  eveningMealIng: Record<string, unknown>;
  morningMealIns?: string;
  nightMealIns?: string;
  eveningMealIns?: string;
  assigned: boolean;
  assignedToDel: boolean;
  morningMealPrep: boolean;
  nightMealPrep: boolean;
  eveningMealPrep: boolean;
  morningMealDel: boolean;
  nightMealDel: boolean;
  eveningMealDel: boolean;
}

interface User {
  id: string;
  name: string;
  diseases: string[];
  allergies: string[];
  room: number;
  bed: number;
  floor: number;
  age: number;
  gender: string;
  contact: string;
  emergencyContact: string;
}

interface Pantry {
  id: string;
  staffName: string;
  contact: string;
  location: string
  mealId?: string[]
}

interface Delivery {
  id: string;
  name: string;
  contact: string;
  mealId?: string[]
  assigned: boolean;
  delivered: boolean;
}

const App = () => {

  const { setUsers, setMeals, setPantryPeople, setDelPeople} = useStateContext()


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const api_url = import.meta.env.VITE_API_URL
        // const api_url = "http://localhost:3000"
        const res = await fetch(`${api_url}/user`);
        const data: User[] = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchMeals = async () => {
      try {
        const api_url = import.meta.env.VITE_API_URL
        // const api_url = "http://localhost:3000"
        const res = await fetch(`${api_url}/meals`);
        const data: Meals[] = await res.json();
        setMeals(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    const fetchPantryStaff = async () => {
      try {
        const api_url = import.meta.env.VITE_API_URL
        // const api_url = "http://localhost:3000"
        const res = await fetch(`${api_url}/pantry`);
        const data: Pantry[] = await res.json();
        setPantryPeople(data);
        // console.log("Pantry Staff:", data);
      } catch (error) {
        console.error("Error fetching pantry staff:", error);
      }
    }

    const fetchDelStaff = async () => {
      try {
        const api_url = import.meta.env.VITE_API_URL
        // const api_url = "http://localhost:3000"
        const res = await fetch(`${api_url}/delivery`);
        const data: Delivery[] = await res.json();
        setDelPeople(data);
        // console.log("Delivery Staff:", data);
      } catch (error) {
        console.error("Error fetching delivery staff:", error);
      }
    }

    fetchUsers();
    fetchMeals();
    fetchPantryStaff();
    fetchDelStaff();

  }, [setDelPeople, setMeals, setPantryPeople, setUsers]);


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
