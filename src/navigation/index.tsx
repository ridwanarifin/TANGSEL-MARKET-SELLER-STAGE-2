import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '../types';
import BottomTabNavigator from './Tab/BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import NotFoundScreen from '../screens/NotFoundScreen';
import AuthStackNavigator from './Stack/AuthStackNavigator';
import JasaKirimStackNavigator from './Stack/JasaKirimStackNavigator';
import { RootState } from '../redux/rootReducer';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';

import {
  setAuth,
  setAuthError,
  setIsLogged,
  tokenType
} from '../redux/authSlice';
import { getAsyncAuth, getUserMe } from '../api/get';


enableScreens();

export default function Navigation(props: any) {
  return (
    <NavigationContainer {...props} linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
};

// Read more here: https://reactnavigation.org/docs/modal
const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    getAsyncAuth()
    .then(response => {
      dispatch(setAuth(response))
    })
  }, []);

  React.useEffect(() => {
    if (auth.access_token && !user.nik) {
      dispatch(getUserMe());

      if (getUserMe.fulfilled) {
        dispatch(setIsLogged({ isLogged: true }));
      } else {
        dispatch(setIsLogged({ isLogged: false }));
      }
    }
  }, [auth])

  return (
    <Stack.Navigator initialRouteName="Root">
      {
        !auth.isLogged ? (
          <Stack.Screen name="Auth" component={AuthStackNavigator} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen
              name="JasaKirimModal"
              component={JasaKirimStackNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
          </>
        )
      }

    </Stack.Navigator>
  );
}
