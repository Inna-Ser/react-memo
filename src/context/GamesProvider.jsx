/* eslint-disable prettier/prettier */
import React, { useState } from "react";

export const GamesContext = React.createContext(null);

export const LifeProvider = ({ children }) => {
  const [lifes, setLifes] = useState(0);

  return <GamesContext.Provider value={{ lifes, setLifes }}>{children}</GamesContext.Provider>;
};
