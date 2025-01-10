import { useStateContext } from "../../context";

const Delivery_Dashboard = () => {
  const { users, meals, delPeople } = useStateContext();

  const handleMarkDelivered = async (deliveryId: string, mealId: string) => {
    const thatMeal = meals.find((meal) => meal.id === mealId);
    const mDel = thatMeal?.morningMealDel;
    const eDel = thatMeal?.eveningMealDel;
    const nDel = thatMeal?.nightMealDel;
  
    try {
      // const api_url = "http://localhost:3000";
      // const api_url = import.meta.env.VITE_API_URL
      const api_url = "https://hosp-food-sys-bknd.onrender.com"
      const response = await fetch(`${api_url}/delivery/update/${deliveryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ delivered: true }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const updatedDelivery = await response.json();
      console.log(updatedDelivery);
    } catch (error) {
      console.error("Error marking delivery as completed", error);
    }
  
    // Handle meal delivery status update
    try {
      // const api_url = "http://localhost:3000";
      // const api_url = import.meta.env.VITE_API_URL
      const api_url = "https://hosp-food-sys-bknd.onrender.com"
      let mealUpdateData = {};
  
      if (mDel === false) {
        mealUpdateData = { morningMealDel: true };
      } else if (eDel === false) {
        mealUpdateData = { eveningMealDel: true };
      } else if (nDel === false) {
        mealUpdateData = { nightMealDel: true };
      }
  
      const response = await fetch(`${api_url}/meals/update/${mealId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealUpdateData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const updatedMeal = await response.json();
      console.log(updatedMeal);
    } catch (error) {
      console.error("Error updating meal delivery status", error);
    }
  };
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Delivery Dashboard</h1>

      {delPeople.map((delPerson) => {
        const mealsToDeliver = delPerson.mealId || [];

        if (!mealsToDeliver.length) return null;

        return (
          <div key={delPerson.id} className="mb-8 border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">
              {delPerson.name} ({delPerson.contact})
            </h2>
            <p className="text-gray-600">Assigned Meals:</p>

            {mealsToDeliver.map((mealId) => {
              const meal = meals.find((m) => m.id === mealId);
              const user = users.find((u) => u.id === meal?.userId);

              if (!meal || !user) return null;

              return (
                <div key={meal.id} className="mt-4 p-4 border rounded-lg bg-gray-100">
                  <h3 className="text-lg font-semibold">Meal ID: {meal.id}</h3>
                  <p><strong>User:</strong> {user.name}</p>
                  <p><strong>Room:</strong> {user.room}, <strong>Bed:</strong> {user.bed}, <strong>Floor:</strong> {user.floor}</p>
                  <p><strong>Contact:</strong> {user.contact}</p>
                  <p>
                    <strong>Diseases:</strong> {user.diseases.join(", ")} | <strong>Allergies:</strong> {user.allergies.join(", ")}
                  </p>

                  <div className="mt-4">
                    <h4 className="text-md font-semibold">Meal Details</h4>
                    {/* Morning Meal */}
                    <div className="mt-2">
                      <h5 className="font-semibold capitalize">Morning Meal</h5>
                      <p><strong>Ingredients:</strong> {JSON.stringify(meal.morningMealIng)}</p>
                      {meal.morningMealIns && (
                        <p><strong>Instructions:</strong> {JSON.stringify(meal.morningMealIns)}</p>
                      )}
                    </div>
                    {/* Evening Meal */}
                    <div className="mt-2">
                      <h5 className="font-semibold capitalize">Evening Meal</h5>
                      <p><strong>Ingredients:</strong> {JSON.stringify(meal.eveningMealIng)}</p>
                      {meal.eveningMealIns && (
                        <p><strong>Instructions:</strong> {JSON.stringify(meal.eveningMealIns)}</p>
                      )}
                    </div>
                    {/* Night Meal */}
                    <div className="mt-2">
                      <h5 className="font-semibold capitalize">Night Meal</h5>
                      <p><strong>Ingredients:</strong> {JSON.stringify(meal.nightMealIng)}</p>
                      {meal.nightMealIns && (
                        <p><strong>Instructions:</strong> {JSON.stringify(meal.nightMealIns)}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => handleMarkDelivered(delPerson.id, meal.id)}
                      className="w-1/3 py-3 px-5 bg-green-500 text-white text-lg font-semibold rounded-lg shadow hover:bg-green-600 transition"
                    >
                      Mark Delivered
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Delivery_Dashboard;
