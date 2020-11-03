import React from "react";
import { createContext, useContext, useReducer } from "react";

const ThemeStateContext = createContext();
const ThemeDispatchContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case "light":
      return { ...state, theme: "light" };
    case "dark":
      return { ...state, theme: "dark" };
    default:
      return { ...state, theme: "light" };
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, { theme: "light" });
  return (
    <ThemeStateContext.Provider value={state}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
};

export const useThemeState = () => useContext(ThemeStateContext);
export const useThemeDispatch = () => useContext(ThemeDispatchContext);
