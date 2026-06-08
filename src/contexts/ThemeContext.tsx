import React, { createContext, useContext, useState } from 'react';
import { colors } from '../theme';

type ThemeContextData = {
  isDark: boolean;
  toggleTheme: () => void;
  theme: typeof colors;
};

const ThemeContext = createContext<ThemeContextData>({
  isDark: false,
  toggleTheme: () => {},
  theme: colors,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  function toggleTheme() { setIsDark(prev => !prev); }
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme: colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
