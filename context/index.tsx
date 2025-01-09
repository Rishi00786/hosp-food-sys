import React, { createContext, useContext, useState, ReactNode } from 'react';

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

interface StateContextType {
    users: User[]
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    meals: Meals[]
    setMeals: React.Dispatch<React.SetStateAction<Meals[]>>;
    pantryPeople: Pantry[]
    setPantryPeople: React.Dispatch<React.SetStateAction<Pantry[]>>;
    delPeople: Delivery[]
    setDelPeople: React.Dispatch<React.SetStateAction<Delivery[]>>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useStateContext must be used within a StateProvider');
    }
    return context;
};

export const StateProvider = ({ children }: { children: ReactNode }) => {

    const [users, setUsers] = useState<User[]>([]);
    const [meals, setMeals] = useState<Meals[]>([]);
    const [pantryPeople, setPantryPeople] = useState<Pantry[]>([]);
    const [delPeople, setDelPeople] = useState<Delivery[]>([]);

    return (
        <StateContext.Provider value={{users, setUsers, meals, setMeals,
             pantryPeople, setPantryPeople, delPeople, setDelPeople}}>
            {children}
        </StateContext.Provider>
    )
}