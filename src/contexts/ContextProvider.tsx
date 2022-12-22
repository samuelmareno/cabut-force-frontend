import React, {createContext, useContext, useState} from "react";

const StateContext = createContext({} as StateContextProviderProps);

export type UserState = {

    isLoggedIn: boolean;
    id: string;
    name: string;
    email: string;
    role: string;
    lastLogin: number | null;
    createdAt: number;
}

type StateContextProviderProps = {
    children?: React.ReactNode,
    activeMenu: boolean,
    setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>,
    screenSize: any,
    setScreenSize: React.Dispatch<React.SetStateAction<any>>,
    currentState: UserState,
    setCurrentState: React.Dispatch<React.SetStateAction<UserState>>,
    showAddProspect: boolean,
    setShowAddProspect: React.Dispatch<React.SetStateAction<boolean>>,
}

export const StateContextProvider = ({children}: StateContextProviderProps) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [currentState, setCurrentState] = useState({} as UserState);
    const [screenSize, setScreenSize] = useState(undefined);
    const [showAddProspect, setShowAddProspect] = useState(false);

    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                currentState,
                setCurrentState,
                screenSize,
                setScreenSize,
                showAddProspect,
                setShowAddProspect
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
