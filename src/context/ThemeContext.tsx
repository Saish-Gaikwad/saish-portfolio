import React, { createContext, useContext, useState, useEffect } from 'react'

export type ThemeMode = 'dark' | 'light'

interface ThemeContextType {
  theme: ThemeMode
  toggleTheme: () => void
  setTheme: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('sg_theme') as ThemeMode | null
    if (saved === 'light' || saved === 'dark') {
      setThemeState(saved)
      document.documentElement.classList.toggle('theme-light', saved === 'light')
    } else {
      setThemeState('dark')
      document.documentElement.classList.remove('theme-light')
    }
  }, [])

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode)
    localStorage.setItem('sg_theme', mode)
    document.documentElement.classList.toggle('theme-light', mode === 'light')
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
