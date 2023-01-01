import React, {createContext, useContext, useState} from "react";

const StateContext = createContext({} as StateContextProviderProps);

type StateContextProviderProps = {
    children?: React.ReactNode,
    activeMenu: boolean,
    setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>,
    screenSize: any,
    setScreenSize: React.Dispatch<React.SetStateAction<any>>,
}

export const StateContextProvider = ({children}: StateContextProviderProps) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);

    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                screenSize,
                setScreenSize,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
