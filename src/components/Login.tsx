import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmitUser = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    if (pass === import.meta.env.VITE_LOGIN_PASS) {
      if (email === import.meta.env.VITE_MANAGER) {
        localStorage.setItem("person", "manager");
        navigate("/Manager_Dashboard"); // Navigate to manager dashboard
      } else if (email === import.meta.env.VITE_PANTRY) {
        localStorage.setItem("person", "pantry");
        navigate("/Pantry_Dashboard"); // Navigate to pantry dashboard
      } else if (email === import.meta.env.VITE_DELIVERY) {
        localStorage.setItem("person", "delivery");
        navigate("/Delivery_Dashboard"); // Navigate to delivery dashboard
      } else {
        alert("Invalid email id");
      }
    } else {
      alert("Invalid password");
    }
  };

  return (
    <section className="flex items-center justify-center">
      <div className="w-full px-4 py-8 lg:py-12">
        <div className="w-full bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700">
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
              Hospital Food System
            </h2>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Enter your credentials to access the dashboard
            </p>

            <form onSubmit={handleSubmitUser} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  className="w-full px-4 py-2 text-sm border rounded-lg shadow-sm dark:bg-gray-700 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 text-sm border rounded-lg shadow-sm dark:bg-gray-700 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                  required
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
