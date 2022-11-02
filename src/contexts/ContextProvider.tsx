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
  handleClick: (clicked: string) => void
}

export const StateContextProvider = ({children}: StateContextProviderProps) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [currentState, setState] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);

  const handleClick = (clicked: string) => {
    setState({ ...initialState, [clicked]: true });
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        currentState,
        setState,
        handleClick,
        screenSize,
        setScreenSize,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
