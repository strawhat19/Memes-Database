import { Appearance, Platform } from 'react-native';
import type { PropsWithChildren } from 'react';
import { readStorage, writeStorage } from '../common/storage';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { themePalettes, type ThemeMode, type ThemePalette } from '../../styles/theme/theme';

type ThemeContextValue = {
  theme: ThemeMode;
  palette: ThemePalette;
  error: string | null;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
};

const themeKey = `memes-database.theme.v1`;
export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, updateTheme] = useState<ThemeMode>(`dark`);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    readStorage(themeKey).then(stored => {
      if (!active) return;
      if (stored === `light` || stored === `dark`) updateTheme(stored);
      else if (stored !== null) setError(`Your saved theme could not be read`);
    }).catch(() => {
      if (active) setError(`Your theme preference could not be loaded`);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (Platform.OS === `web` && typeof document !== `undefined`) {
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
      const meta = document.querySelector(`meta[name="theme-color"]`);
      meta?.setAttribute(`content`, themePalettes[theme].paper);
      Object.entries(themePalettes[theme]).forEach(([name, value]) => {
        document.documentElement.style.setProperty(`--${name}`, value);
      });
    } else Appearance.setColorScheme(theme);
  }, [theme]);

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    updateTheme(nextTheme);
    writeStorage(themeKey, nextTheme).then(() => setError(null)).catch(() => {
      setError(`This theme could not be saved on your device`);
    });
  }, []);

  const toggleTheme = useCallback(() => setTheme(theme === `dark` ? `light` : `dark`), [setTheme, theme]);
  const value = useMemo(() => ({ error, theme, palette: themePalettes[theme], setTheme, toggleTheme }), [error, setTheme, theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
