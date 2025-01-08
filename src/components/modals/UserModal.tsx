import React, { useState } from "react";

interface FormData {
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

interface UserModalProps {
    onClose: () => void;
    onCreate: (data: FormData) => void;
}

const UserModal: React.FC<UserModalProps> = ({ onClose, onCreate }) => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        diseases: [],
        allergies: [],
        room: 0,
        bed: 0,
        floor: 0,
        age: 0,
        gender: "",
        contact: "",
        emergencyContact: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "room" || name === "bed" || name === "floor" || name === "age"
                ? parseInt(value, 10) || 0 // Convert number fields to integers
                : value,
        }));
    };

    const handleArrayChange = (name: "diseases" | "allergies", value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value.split(",").map((item) => item.trim()), // Convert comma-separated strings to arrays
        }));
    };

    const handleSubmit = () => {
        onCreate(formData);
        onClose(); // Close the modal after creation
    };

    return (
        <div className="flex w-[80vw] h-[80vh] items-center justify-center  bg-opacity-50">
            <div className="bg-white w-full h-full max-w-[600px] p-6 rounded-lg shadow-lg relative overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 cursor-pointer right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
                >
                    ✖
                </button>

                {/* Modal Title */}
                <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
                    Patient Registration
                </h1>

                {/* Modal Subtitle */}
                <h2 className="text-base text-center text-gray-600 mb-6">
                    Fill in the details below to register a new patient.
                </h2>

                {/* Form Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Diseases (comma-separated)</label>
                        <textarea
                            name="diseases"
                            value={formData.diseases.join(", ")}
                            onChange={(e) => handleArrayChange("diseases", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter diseases"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Allergies (comma-separated)</label>
                        <textarea
                            name="allergies"
                            value={formData.allergies.join(", ")}
                            onChange={(e) => handleArrayChange("allergies", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter allergies"
                        ></textarea>
                    </div>

                    {["room", "bed", "floor", "age"].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type="number"
                                name={field}
                                value={formData[field as keyof FormData]}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder={`Enter ${field}`}
                            />
                        </div>
                    ))}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <input
                            type="text"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter gender"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contact</label>
                        <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter contact"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                        <input
                            type="text"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter emergency contact"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full mt-6 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    Create Patient
                </button>
            </div>
        </div>


    );
};

export default UserModal;
