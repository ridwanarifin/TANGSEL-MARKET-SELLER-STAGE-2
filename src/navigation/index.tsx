import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import * as React from 'react';

import { RootStackParamList } from '../types';
import BottomTabNavigator from './Tab/BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import NotFoundScreen from '../screens/NotFoundScreen';
import AuthStackNavigator from './Stack/AuthStackNavigator';
import JasaKirimStackNavigator from './Stack/JasaKirimStackNavigator';

enableScreens();

export default function Navigation(props: any) {
  return (
    <NavigationContainer {...props} linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// Read more here: https://reactnavigation.org/docs/modal
const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen name="Auth" component={AuthStackNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="JasaKirimModal"
        component={JasaKirimStackNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
