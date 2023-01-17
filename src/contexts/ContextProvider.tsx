import React, {createContext, useContext, useState} from "react";

const StateContext = createContext({} as StateContextProviderProps);

type StateContextProviderProps = {
    children?: React.ReactNode,
    activeMenu: boolean,
    setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>,
    screenWidthSize: number,
    setScreenWidthSize: React.Dispatch<React.SetStateAction<number>>,
    screenHeightSize: number,
    setScreenHeightSize: React.Dispatch<React.SetStateAction<number>>,
}

export const StateContextProvider = ({children}: StateContextProviderProps) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenWidthSize, setScreenWidthSize] = useState(0);
    const [screenHeightSize, setScreenHeightSize] = useState(0);

    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                screenWidthSize: screenWidthSize,
                setScreenWidthSize: setScreenWidthSize,
                screenHeightSize: screenHeightSize,
                setScreenHeightSize: setScreenHeightSize,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);