import React, { createContext, useContext, useState } from 'react';

interface AccountContextProps {
  liquidity: number;
  updateLiquidity: (newLiquidity: number) => void;
}

const AccountContext = createContext<AccountContextProps | undefined>(undefined);

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccountContext must be used within an AccountProvider');
  }
  return context;
};

export const AccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [liquidity, setLiquidity] = useState<number>(0);

  const updateLiquidity = (newLiquidity: number) => {
    setLiquidity((prevLiquidity) => prevLiquidity + newLiquidity);
  };

  return (
    <AccountContext.Provider value={{ liquidity, updateLiquidity }}>
      {children}
    </AccountContext.Provider>
  );
};
