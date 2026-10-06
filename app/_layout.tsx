import { Slot } from 'expo-router';
import AppShell from '../src/components/AppShell';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MemesProvider } from '../src/shared/memesContext/MemesContext';
import { ThemeProvider } from '../src/shared/themeContext/ThemeContext';
import PwaRegistration from '../src/shared/pwa/PwaRegistration';

const RootLayout = () => (
  <SafeAreaProvider>
    <ThemeProvider>
      <MemesProvider>
        <PwaRegistration />
        <AppShell>
          <Slot />
        </AppShell>
      </MemesProvider>
    </ThemeProvider>
  </SafeAreaProvider>
);

export default RootLayout;
