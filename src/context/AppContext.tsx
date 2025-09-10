import { createContext, FC, ReactNode, useState } from 'react';


export type AppContextType = {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
};

export const AppContext = createContext<AppContextType | null>(null);

const AppProvider : FC<{children: ReactNode}> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
