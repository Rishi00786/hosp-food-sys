import { useEffect, useState } from "react";
import UserModal from "./modals/UserModal";
import MealsModal from "./modals/MealsModal";

interface Meals {
  id: string;
  userId: string;
  morningMealIng: Record<string, unknown>;
  nightMealIng: Record<string, unknown>;
  eveningMealIng: Record<string, unknown>;
  morningMealIns?: string;
  nightMealIns?: string;
  eveningMealIns?: string;
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

const Manager_Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [meals, setMeals] = useState<Meals[]>([]);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [showMealsModal, setShowMealsModal] = useState<boolean>(false);
  const [thisUserId, setThisUserId] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/user");
        const data: User[] = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchMeals = async () => {
      try {
        const res = await fetch("http://localhost:3000/meals");
        const data: Meals[] = await res.json();
        setMeals(data);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchUsers();
    fetchMeals();
  }, []);

  const handleCreateUser = async (data: unknown) => {
    try {
      const api_url = 'http://localhost:3000';
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
      const createdUser: User = await response.json();
      setUsers([...users, createdUser]);
      setShowUserModal(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  const handleCreateMeals = async (data: unknown) => {
    try {
      const api_url = 'http://localhost:3000';
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
          {users.map((user) => {
            const userMeals = meals.find((meal) => meal.userId === user.id);

            return (
              <div
                key={user.id}
                className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition-shadow transform hover:scale-105"
              >
                <h2 className="text-3xl font-bold text-blue-700 mb-6">
                  {user.name}
                </h2>
                <div className="text-base text-gray-700 space-y-3">
                  <p>
                    <span className="font-semibold">Room:</span> {user.room}, Bed:{" "}
                    {user.bed}, Floor: {user.floor}
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
                    <span className="font-semibold">Emergency Contact:</span>{" "}
                    {user.emergencyContact}
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
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                      Meals
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-800">
                          Morning Meal:
                        </h4>
                        <p className="text-sm text-gray-600">
                          Ingredients:{" "}
                          {userMeals.morningMealIng
                            ? JSON.stringify(userMeals.morningMealIng)
                            : "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Instructions: {userMeals.morningMealIns || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-800">
                          Evening Meal:
                        </h4>
                        <p className="text-sm text-gray-600">
                          Ingredients:{" "}
                          {userMeals.eveningMealIng
                            ? JSON.stringify(userMeals.eveningMealIng)
                            : "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Instructions: {userMeals.eveningMealIns || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-800">
                          Night Meal:
                        </h4>
                        <p className="text-sm text-gray-600">
                          Ingredients:{" "}
                          {userMeals.nightMealIng
                            ? JSON.stringify(userMeals.nightMealIng)
                            : "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Instructions: {userMeals.nightMealIns || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-8">
                    <p className="text-gray-600 text-base mb-4">
                      No meals for this patient yet.
                    </p>
                    <button onClick={() => { setShowMealsModal(true); setThisUserId(user.id) }} className="w-full py-3 px-5 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-600 transition">
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

    </>
  );


};

export default Manager_Dashboard;
