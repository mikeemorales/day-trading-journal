import React, { createContext, useContext, useState } from 'react';

interface WinsLossesContextType {
  winsCount: number;
  lossesCount: number;
  updateWins: (count: number) => void;
  updateLosses: (count: number) => void;
}

const WinsLossesContext = createContext<WinsLossesContextType | undefined>(undefined);

export const WinsLossesProvider = ({ children }: { children: React.ReactNode }) => {
  const [winsCount, setWinsCount] = useState<number>(0);
  const [lossesCount, setLossesCount] = useState<number>(0);

  const updateWins = (count: number) => {
    setWinsCount(count);
  };

  const updateLosses = (count: number) => {
    setLossesCount(count);
  };

  return (
    <WinsLossesContext.Provider value={{ winsCount, lossesCount, updateWins, updateLosses }}>
      {children}
    </WinsLossesContext.Provider>
  );
};

export const useWinsLosses = (): WinsLossesContextType => {
  const context = useContext(WinsLossesContext);
  if (!context) {
    throw new Error('useWinsLosses must be used within a WinsLossesProvider');
  }
  return context;
};
