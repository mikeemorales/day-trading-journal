// InputValuesContext.tsx

import React, { createContext, useContext, useState } from 'react';

interface InputValuesContextType {
  weeklyInputValues: string[][];
  setWeeklyInputValues: React.Dispatch<React.SetStateAction<string[][]>>;
  // Add other state or functions as needed
}

const InputValuesContext = createContext<InputValuesContextType | undefined>(undefined);

export const useInputValuesContext = () => {
  const context = useContext(InputValuesContext);
  if (!context) {
    throw new Error('useInputValuesContext must be used within an InputValuesProvider');
  }
  return context;
};

export const InputValuesProvider= ({ children }: { children: React.ReactNode }) => {
  const [weeklyInputValues, setWeeklyInputValues] = useState<string[][]>([
    ['', '', '', '', ''], // Default values for week1 to week5
    ['', '', '', '', ''], // Default values for week1 to week5
    ['', '', '', '', ''], // Default values for week1 to week5
    ['', '', '', '', ''], // Default values for week1 to week5
    ['', '', '', '', ''], // Default values for week1 to week5
  ]);

  // Add other state or functions as needed

  const contextValue: InputValuesContextType = {
    weeklyInputValues,
    setWeeklyInputValues,
    // Add other state or functions as needed
  };

  return (
    <InputValuesContext.Provider value={contextValue}>
      {children}
    </InputValuesContext.Provider>
  );
};
