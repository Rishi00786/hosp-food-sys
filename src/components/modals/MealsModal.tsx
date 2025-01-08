import React, { useState } from "react";

interface MealsModalProps {
  onClose: () => void;
  onSubmit: (formData: MealsFormData) => void;
  initialData?: MealsFormData;
}

interface MealsFormData {
  morningMealIng: string[];
  nightMealIng: string[];
  eveningMealIng: string[];
  morningMealIns?: string;
  nightMealIns?: string;
  eveningMealIns?: string;
}

const MealsModal: React.FC<MealsModalProps> = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<MealsFormData>(
    initialData || {
      morningMealIng: [],
      nightMealIng: [],
      eveningMealIng: [],
      morningMealIns: "",
      nightMealIns: "",
      eveningMealIns: "",
    }
  );

  const handleArrayChange = (key: keyof MealsFormData, value: string) => {
    setFormData({
      ...formData,
      [key]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleInputChange = (key: keyof MealsFormData, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="flex w-[80vw] h-[80vh] items-center justify-center">
      <div className="bg-white w-full h-full max-w-[600px] p-6 rounded-lg shadow-lg relative overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          ✖
        </button>

        {/* Modal Title */}
        <h1 className="text-2xl font-bold text-center text-green-700 mb-4">
          Meal Details
        </h1>

        {/* Modal Subtitle */}
        <h2 className="text-base text-center text-gray-600 mb-6">
          Provide the meal ingredients and instructions for each meal.
        </h2>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Morning Meal */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Morning Meal Ingredients (comma-separated)</label>
            <textarea
              value={formData.morningMealIng.join(", ")}
              onChange={(e) => handleArrayChange("morningMealIng", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter ingredients"
            />
            <label className="block text-sm font-medium text-gray-700 mt-3">Morning Meal Instructions</label>
            <input
              type="text"
              value={formData.morningMealIns || ""}
              onChange={(e) => handleInputChange("morningMealIns", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter instructions"
            />
          </div>

          {/* Evening Meal */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Evening Meal Ingredients (comma-separated)</label>
            <textarea
              value={formData.eveningMealIng.join(", ")}
              onChange={(e) => handleArrayChange("eveningMealIng", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter ingredients"
            />
            <label className="block text-sm font-medium text-gray-700 mt-3">Evening Meal Instructions</label>
            <input
              type="text"
              value={formData.eveningMealIns || ""}
              onChange={(e) => handleInputChange("eveningMealIns", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter instructions"
            />
          </div>

          {/* Night Meal */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Night Meal Ingredients (comma-separated)</label>
            <textarea
              value={formData.nightMealIng.join(", ")}
              onChange={(e) => handleArrayChange("nightMealIng", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter ingredients"
            />
            <label className="block text-sm font-medium text-gray-700 mt-3">Night Meal Instructions</label>
            <input
              type="text"
              value={formData.nightMealIns || ""}
              onChange={(e) => handleInputChange("nightMealIns", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter instructions"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          Save Meals
        </button>
      </div>
    </div>
  );
};

export default MealsModal;