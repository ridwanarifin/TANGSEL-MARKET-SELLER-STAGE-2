import { StatusBar } from 'expo-status-bar';
import { useKeepAwake } from 'expo-keep-awake';
import * as Linking from 'expo-linking';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  NavigationContainer,
  InitialState,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import merge from 'deepmerge';
import { Platform } from 'react-native';
import * as React from 'react';
import * as Paper from 'react-native-paper';

import StoreProvider from './providers/StoreProvider';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Fonts from './constants/Fonts';
import { RootNavigator } from './navigation';
import Colors from './constants/Colors';

const CustomPaperDefaultTheme: ReactNativePaper.Theme = {
  ...Paper.DefaultTheme,
  fonts: Paper.configureFonts(Fonts),
  colors: {
    ...Paper.DefaultTheme.colors,
    link: '#08A0E9',
    textLink: '#3273DC',
    placeholder: Colors.light.greyLight
  }
}

const CustomPaperDarkTheme: ReactNativePaper.Theme = {
  ...Paper.DarkTheme,
  fonts: Paper.configureFonts(Fonts),
  colors: {
    ...Paper.DarkTheme.colors,
    link: '#08A0E9',
    textLink: '#3273DC',
    placeholder: Colors.light.greyLight
  }
}

const CombineDefaultTheme = merge(CustomPaperDefaultTheme, NavigationDefaultTheme);
const CombineDarkTheme = merge(CustomPaperDarkTheme, NavigationDarkTheme);

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

export default function index() {
  useKeepAwake();
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState<
    InitialState | undefined
  >();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = Linking.getInitialURL();
        if (Platform.OS !== 'web' && initialUrl == null) {
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;
          console.log(state);

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady || !isLoadingComplete) {
    return <Paper.ActivityIndicator />;
  }

  return (
    <Paper.Provider theme={CombineDefaultTheme}>
      <StoreProvider>
        <SafeAreaProvider>
          <NavigationContainer
            theme={CombineDefaultTheme}
            initialState={initialState}
            onStateChange={(state) =>
              AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
            }
          >
            <RootNavigator />
          </NavigationContainer>
          <StatusBar animated></StatusBar>
        </SafeAreaProvider>
      </StoreProvider>
    </Paper.Provider>
  )
};
