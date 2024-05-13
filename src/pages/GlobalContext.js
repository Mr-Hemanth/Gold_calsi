import React, { createContext, useState, useEffect, useContext } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [goldRate, setGoldRate] = useState(localStorage.getItem('goldRate') || '');
  const [silverRate, setSilverRate] = useState(localStorage.getItem('silverRate') || '');

  useEffect(() => {
    localStorage.setItem('goldRate', goldRate);
    localStorage.setItem('silverRate', silverRate);
  }, [goldRate, silverRate]);

  return (
    <GlobalContext.Provider value={{ goldRate, silverRate, setGoldRate, setSilverRate }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
