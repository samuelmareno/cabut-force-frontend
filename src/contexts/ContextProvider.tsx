import React, {createContext, useContext, useState} from "react";

const StateContext = createContext({} as StateContextProviderProps);

type StateContextProviderProps = {
    children?: React.ReactNode,
    activeMenu: boolean,
    setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>,
    screenSize: any,
    setScreenSize: React.Dispatch<React.SetStateAction<any>>,
    showAddProspect: boolean,
    setShowAddProspect: React.Dispatch<React.SetStateAction<boolean>>,
}

export const StateContextProvider = ({children}: StateContextProviderProps) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);
    const [showAddProspect, setShowAddProspect] = useState(false);

    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
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
