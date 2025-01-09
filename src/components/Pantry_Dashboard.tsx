import { useState } from "react";
import { useStateContext } from "../../context";
import DeliveryModal from "./modals/DeliveryModal";

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

interface Delivery {
  id: string;
  name: string;
  contact: string;
  mealId?: string[]
  assigned: boolean;
  delivered: boolean;
}

const Pantry_Dashboard = () => {

  const { users, meals, pantryPeople, delPeople } = useStateContext();


  const [showDelPeople, setShowDelPeople] = useState(false)
  const [thisMealId, setThisMealId] = useState("")

  const onMealPreparation = async (mealId: string, mealType: string) => {
    try {
      const api_url = "http://localhost:3000"
      const response = await fetch(`${api_url}/meals/update/${mealId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ [mealType]: true }),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedMeal: Meals = await response.json();
      console.log(updatedMeal)
    } catch (error) {
      console.error("Errror updating meal prep", error)
    }
  };

  const handleAssignDel = async(DelPersonId: string) => {
    const delPersonAssigned = delPeople.find((p)=>p.id === DelPersonId)
    const prevMealIds = delPersonAssigned?.mealId || []
    try {
      const api_url = "http://localhost:3000"
      const response = await fetch(`${api_url}/delivery/update/${DelPersonId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mealId: [...prevMealIds,thisMealId], assigned: true }),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedPantry: Delivery = await response.json();
      console.log(updatedPantry)
    } catch (error) {
      console.error("Error assigning del person", error);
    }
  }


  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Pantry Dashboard</h1>
        {pantryPeople.map((pantry) => (
          <div key={pantry.id} className="mb-8 border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">
              {pantry.staffName} ({pantry.contact})
            </h2>
            <p className="text-gray-600">Location: {pantry.location}</p>

            {pantry.mealId?.length ? (
              pantry.mealId.map((mealId) => {
                const meal = meals.find((m) => m.id === mealId);
                const user = users.find((u) => u.id === meal?.userId);

                if (!meal || !user) return null;

                return (
                  <div
                    key={meal.id}
                    className="mt-4 p-4 border rounded-lg bg-gray-100"
                  >
                    <h3 className="text-lg font-semibold">Meal ID: {meal.id}</h3>
                    <p><strong>User:</strong> {user.name}</p>
                    <p><strong>Room:</strong> {user.room}, <strong>Bed:</strong> {user.bed}, <strong>Floor:</strong> {user.floor}</p>
                    <p><strong>Contact:</strong> {user.contact}</p>
                    <p>
                      <strong>Diseases:</strong> {user.diseases.join(", ")} | <strong>Allergies:</strong> {user.allergies.join(", ")}
                    </p>

                    <div className="mt-4">
                      <h4 className="text-md font-semibold">Meal Details {meal.assignedToDel}</h4>
                      {["morning", "evening", "night"].map((mealType) => (
                        <div key={mealType} className="mt-2">
                          <h5 className="font-semibold capitalize">
                            {mealType} Meal
                          </h5>
                          <p><strong>Ingredients:</strong> {JSON.stringify(meal[`${mealType}MealIng` as keyof Meals])}</p>
                          {meal[`${mealType}MealIns` as keyof Meals] && (
                            <p><strong>Instructions:</strong> {JSON.stringify(meal[`${mealType}MealIns` as keyof Meals])}</p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex gap-4">
                      {["morning", "evening", "night"].map((mealType) => (
                        <button
                          key={mealType}
                          onClick={() =>
                            onMealPreparation(meal.id, `${mealType}MealPrep`)
                          }
                          className={`py-2 px-4 text-white rounded ${meal[`${mealType}MealPrep` as keyof Meals]
                            ? "bg-green-500"
                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        >
                          {meal[`${mealType}MealPrep` as keyof Meals]
                            ? `${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Prepared`
                            : `Mark ${mealType} Prepared`}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4">
                    {meal.assignedToDel ? (
                        <button className="w-1/3 py-3 px-5 bg-green-500 text-white text-lg font-semibold rounded-lg shadow hover:bg-green-600 transition">
                          Assigned
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setShowDelPeople(true);
                            setThisMealId(meal.id);
                          }}
                          className="w-1/3 py-3 px-5 bg-red-500 text-white text-lg font-semibold rounded-lg shadow hover:bg-red-600 transition"
                        >
                          Assign Delivery
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-600 mt-4">No meals assigned yet.</p>
            )}
          </div>
        ))}
      </div>

      {showDelPeople && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6">
            <DeliveryModal onClose={() => setShowDelPeople(false)} onAssign={handleAssignDel} />
          </div>
        </div>

      )}

    </>
  );
};

export default Pantry_Dashboard;
