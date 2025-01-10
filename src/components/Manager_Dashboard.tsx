import { useEffect, useState } from "react";
import UserModal from "./modals/UserModal";
import MealsModal from "./modals/MealsModal";
import PantryModal from "./modals/PantryModal";
import { useStateContext } from "../../context";

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

const Manager_Dashboard = () => {
  // const [users, setUsers] = useState<User[]>([]);
  // const [meals, setMeals] = useState<Meals[]>([]);
  // const [pantryPeople, setPantryPeople] = useState<Pantry[]>([]);
  const {users, setUsers, meals, setMeals, pantryPeople, setPantryPeople} = useStateContext()
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [showMealsModal, setShowMealsModal] = useState<boolean>(false);
  const [showPantry, setShowPantry] = useState<boolean>(false);
  const [thisUserId, setThisUserId] = useState<string>("");
  const [thisMealId, setThisMealId] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const api_url = "http://localhost:3000"
        // const api_url = import.meta.env.VITE_API_URL
        const api_url = "https://hosp-food-sys-bknd.onrender.com"
        const res = await fetch(`${api_url}/user`);
        const data: User[] = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchMeals = async () => {
      try {
        // const api_url = "http://localhost:3000"
        // const api_url = import.meta.env.VITE_API_URL
        const api_url = "https://hosp-food-sys-bknd.onrender.com"
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
        // const api_url = "http://localhost:3000"
        // const api_url = import.meta.env.VITE_API_URL
        const api_url = "https://hosp-food-sys-bknd.onrender.com"
        const res = await fetch(`${api_url}/pantry`);
        const data: Pantry[] = await res.json();
        setPantryPeople(data);
        // console.log("Pantry Staff:", data);
      } catch (error) {
        console.error("Error fetching pantry staff:", error);
      }
    }

    fetchUsers();
    fetchMeals();
    fetchPantryStaff();
  }, [setMeals, setPantryPeople, setUsers]);

  const handleCreateUser = async (data: unknown) => {
    try {
      // const api_url = 'http://localhost:3000';
      // const api_url = import.meta.env.VITE_API_URL
      const api_url = "https://hosp-food-sys-bknd.onrender.com"
      const response = await fetch(`${api_url}/user/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // console.log(response.json())
      // const createdUser: User = await response.json();
      // setUsers([...users, createdUser]);
      setShowUserModal(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  const handleCreateMeals = async (data: unknown) => {
    try {
      // const api_url = 'http://localhost:3000';
      // const api_url = import.meta.env.VITE_API_URL
      const api_url = "https://hosp-food-sys-bknd.onrender.com"
      const response = await fetch(`${api_url}/meals/create/${thisUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // console.log(response)
      const createdMeal: Meals = await response.json();
      setMeals([...meals, createdMeal]);
      setShowMealsModal(false);
    } catch (error) {
      console.error("Error creating meals:", error);
    }
  }

  const handleAssignMeals = async (pantryId: string) => {
    const thisPantry = pantryPeople.find((pantry) => pantry.id === pantryId);

    if (!thisPantry) {
      console.error("Pantry not found");
      return;
    }

    const assignedIdsArray = thisPantry.mealId || [];
    try {
      // const api_url = "http://localhost:3000";
      // const api_url = import.meta.env.VITE_API_URL
      const api_url = "https://hosp-food-sys-bknd.onrender.com"
      const response = await fetch(`${api_url}/pantry/update/${pantryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mealId: [...assignedIdsArray, thisMealId] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPantry: Pantry = await response.json();
      console.log(updatedPantry)
      setPantryPeople(pantryPeople.map((pantry) => pantry.id === updatedPantry.id ? updatedPantry : pantry));
      setShowPantry(false);
    } catch (error) {
      console.error("Error assigning meals", error);
    }

    try {
      // const api_url = "http://localhost:3000";
      // const api_url = import.meta.env.VITE_API_URL
      const api_url = "https://hosp-food-sys-bknd.onrender.com"
      const response = await fetch(`${api_url}/meals/update/${thisMealId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ assigned: true }),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error saving assigned true in meals: ", error);
    }
  }

  return (
    <>
      <div className={`min-h-screen py-12 px-8 ${showUserModal || showMealsModal ? 'blur-lg opacity-50' : ''}`}>
        <h1 className="text-5xl font-extrabold text-blue-800 mb-12 text-center tracking-tight">
          Manager Dashboard
        </h1>
        <div onClick={() => { setShowUserModal(true) }} className="flex justify-center mt-12">
          <button className="w-44 py-3 px-5 bg-gray-200 text-gray-600 text-lg font-semibold rounded-lg shadow hover:bg-gray-300 transition">
            Add Patient
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {users?.map((user) => {
            const userMeals = meals.find((meal) => meal.userId === user.id);
            // console.log(userMeals)

            return (
              <div
                key={user.id}
                className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition-shadow transform hover:scale-105"
              >
                <h2 className="text-3xl font-bold text-blue-700 mb-6">{user.name}</h2>
                <div className="text-base text-gray-700 space-y-3">
                  <p>
                    <span className="font-semibold">Room:</span> {user.room}, Bed: {user.bed}, Floor: {user.floor}
                  </p>
                  <p>
                    <span className="font-semibold">Age:</span> {user.age}
                  </p>
                  <p>
                    <span className="font-semibold">Gender:</span> {user.gender}
                  </p>
                  <p>
                    <span className="font-semibold">Contact:</span> {user.contact}
                  </p>
                  <p>
                    <span className="font-semibold">Emergency Contact:</span> {user.emergencyContact}
                  </p>
                  <div>
                    <span className="font-semibold block mb-2">Diseases:</span>
                    <div className="flex flex-wrap gap-2">
                      {user.diseases.map((disease) => (
                        <span
                          key={disease}
                          className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-semibold"
                        >
                          {disease}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold block mb-2">Allergies:</span>
                    <div className="flex flex-wrap gap-2">
                      {user.allergies.map((allergy) => (
                        <span
                          key={allergy}
                          className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-sm font-semibold"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {userMeals ? (
                  <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">Meals</h3>
                    <div className="space-y-6">
                      <div className="border-t pt-4">
                        <h4 className="text-lg font-medium text-gray-800">Morning Meal:</h4>
                        <div className="text-sm text-gray-600 space-y-2">
                          <p>
                            <span className="font-semibold">Ingredients:</span>{" "}
                            {userMeals.morningMealIng ? JSON.stringify(userMeals.morningMealIng) : "N/A"}
                          </p>
                          <p>
                            <span className="font-semibold">Instructions:</span>{" "}
                            {userMeals.morningMealIns || "N/A"}
                          </p>
                          <div className="flex gap-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${userMeals.morningMealPrep
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                                }`}
                            >
                              {userMeals.morningMealPrep ? "Prepared" : "Not Prepared"}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${userMeals.morningMealDel
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                                }`}
                            >
                              {userMeals.morningMealDel ? "Delivered" : "Not Delivered"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <h4 className="text-lg font-medium text-gray-800">Evening Meal:</h4>
                        <div className="text-sm text-gray-600 space-y-2">
                          <p>
                            <span className="font-semibold">Ingredients:</span>{" "}
                            {userMeals.eveningMealIng ? JSON.stringify(userMeals.eveningMealIng) : "N/A"}
                          </p>
                          <p>
                            <span className="font-semibold">Instructions:</span>{" "}
                            {userMeals.eveningMealIns || "N/A"}
                          </p>
                          <div className="flex gap-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${userMeals.eveningMealPrep
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                                }`}
                            >
                              {userMeals.eveningMealPrep ? "Prepared" : "Not Prepared"}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${userMeals.eveningMealDel
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                                }`}
                            >
                              {userMeals.eveningMealDel ? "Delivered" : "Not Delivered"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <h4 className="text-lg font-medium text-gray-800">Night Meal:</h4>
                        <div className="text-sm text-gray-600 space-y-2">
                          <p>
                            <span className="font-semibold">Ingredients:</span>{" "}
                            {userMeals.nightMealIng ? JSON.stringify(userMeals.nightMealIng) : "N/A"}
                          </p>
                          <p>
                            <span className="font-semibold">Instructions:</span>{" "}
                            {userMeals.nightMealIns || "N/A"}
                          </p>
                          <div className="flex gap-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${userMeals.nightMealPrep
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                                }`}
                            >
                              {userMeals.nightMealPrep ? "Prepared" : "Not Prepared"}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${userMeals.nightMealDel
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                                }`}
                            >
                              {userMeals.nightMealDel ? "Delivered" : "Not Delivered"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      {userMeals.assigned ? (
                        <button className="w-full py-3 px-5 bg-green-500 text-white text-lg font-semibold rounded-lg shadow hover:bg-green-600 transition">
                          Assigned
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setShowPantry(true);
                            setThisUserId(user.id);
                            setThisMealId(userMeals.id);
                          }}
                          className="w-full py-3 px-5 bg-red-500 text-white text-lg font-semibold rounded-lg shadow hover:bg-red-600 transition"
                        >
                          Assign
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mt-8">
                    <p className="text-gray-600 text-base mb-4">No meals for this patient yet.</p>
                    <button
                      onClick={() => {
                        setShowMealsModal(true);
                        setThisUserId(user.id);
                      }}
                      className="w-full py-3 px-5 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-600 transition"
                    >
                      Create New Meal
                    </button>
                  </div>
                )}
              </div>
            );

          })}
        </div>
      </div>


      {showUserModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6">
            <UserModal onClose={() => setShowUserModal(false)} onCreate={handleCreateUser} />
          </div>
        </div>
      )}


      {showMealsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6">
            <MealsModal onClose={() => setShowMealsModal(false)} onSubmit={handleCreateMeals} />
          </div>
        </div>
      )}

      {showPantry && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6">
            <PantryModal pantryPeople={pantryPeople} onClose={() => setShowPantry(false)} onAssign={handleAssignMeals} />
          </div>
        </div>
      )}

    </>
  );


};

export default Manager_Dashboard;
