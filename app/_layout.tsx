import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { useColorScheme } from '@/hooks/useColorScheme';
import {Store,persistor} from '../rtk/Store'
import { PersistGate } from 'redux-persist/integration/react';
import { ScrollView } from 'react-native';
import { LogBox } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    LogBox.ignoreLogs(['VirtualizedLists should never be nested','SerializableStateInvariantMiddleware','A non-serializeabe value was detected in an action']);
// LogBox.ignoreAllLogs()
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <Provider store={Store} >
        <PersistGate loading={null} persistor={persistor} >

    <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{headerShown:false}} >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
    </PersistGate>

    </Provider>
  );
}