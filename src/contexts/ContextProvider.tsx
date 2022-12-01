import React, { createContext, useContext, useState } from "react";

const StateContext = createContext({} as StateContextProviderProps);

interface state {
  isLoggedIn: boolean
}

const initialState: state = {
  isLoggedIn: false
};

type StateContextProviderProps = {
  children?: React.ReactNode,
  activeMenu: boolean,
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>,
  screenSize: any,
  setScreenSize: React.Dispatch<React.SetStateAction<any>>,
  currentState: state,
  setState: React.Dispatch<React.SetStateAction<state>>,
  showAddProspect: boolean,
  setShowAddProspect: React.Dispatch<React.SetStateAction<boolean>>,
}

export const StateContextProvider = ({children}: StateContextProviderProps) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [currentState, setState] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [showAddProspect, setShowAddProspect] = useState(false);

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        currentState,
        setState,
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
