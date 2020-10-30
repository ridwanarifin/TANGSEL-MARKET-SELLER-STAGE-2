import * as React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { AuthParamList } from '../../types';
import SignUpScreen from '../../screens/Auth/SignUpScreen';
import LoginScreen from '../../screens/Auth/LoginScreen';
import BiodataSignUpScreen from '../../screens/Auth/BiodataSignUpScreen';

const AuthStack = createNativeStackNavigator<AuthParamList>()
export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="BiodataSignUpScreen"
        component={BiodataSignUpScreen}
        options={{ stackAnimation: "flip", headerShown: false }}
      />
    </AuthStack.Navigator>
  )
}
