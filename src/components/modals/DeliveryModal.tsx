import React from "react";
import { useStateContext } from "../../../context";

interface DeliveryModalProps {
    onClose: () => void;
    onAssign: (selectedDeliveryId: string) => void;
}

const DeliveryModal: React.FC<DeliveryModalProps> = ({
    onClose,
    onAssign,
}) => {

    const handleAssign = (id: string) => {
        onAssign(id);
        onClose();
    };

    const { delPeople } = useStateContext()

    return (
        <div className="fixed  inset-0 flex items-center justify-center">
            <div className="bg-white h-[80vh] overflow-scroll w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                >
                    ✖
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
                    Delivery Personnel
                </h2>

                {/* Display Delivery People */}
                <div className="space-y-4">
                    {delPeople.map((person) => (
                        <div
                            key={person.id}
                            className="p-4 border border-gray-300 rounded-lg flex justify-between items-center"
                        >
                            <div>
                                <p className="text-lg font-medium text-gray-800">
                                    Name: <span className="font-normal">{person.name}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Contact: <span className="font-normal">{person.contact}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Assigned:{" "}
                                    <span className="font-normal">
                                        {person.assigned ? "Yes" : "No"}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Delivered:{" "}
                                    <span className="font-normal">
                                        {person.delivered ? "Yes" : "No"}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Meal IDs:{" "}
                                    <span className="font-normal">
                                        {person.mealId && person.mealId.length > 0
                                            ? person.mealId.join(", ")
                                            : "None"}
                                    </span>
                                </p>
                            </div>
                            <button
                                onClick={() => handleAssign(person.id)}
                                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Assign
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DeliveryModal;
