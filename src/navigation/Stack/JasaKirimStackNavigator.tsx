import React from 'react'

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { HomeStackParamList, JasaKirimModalParamList } from '../../types';

import JasaKirimScreen from '../../screens/JasaKirim/JasaKirimScreen';
import JasaKirimDetilScreen from '../../screens/JasaKirim/JasaKirimDetilScreen';

const JasaKirimStack = createNativeStackNavigator<JasaKirimModalParamList>();
export default function JasaKirimStackNavigator () {
  return (
    <JasaKirimStack.Navigator>
      <JasaKirimStack.Screen
        name="JasaKirimModalScreen"
        component={JasaKirimScreen}
        // options={{ title: 'Jasa Kirim' }}
        initialParams={{ title: 'Jasa Kirim dalam Tangsel'}}
        options={({ route }) => ({ title: route.params.title })}
      />
      <JasaKirimStack.Screen
        name="JasaKirimModalDetilScreen"
        component={JasaKirimDetilScreen}
        initialParams={{ title: 'Jasa Kirim dalam Tangsel'}}
        options={({ route }) => ({ title: route.params.title })}
      />
    </JasaKirimStack.Navigator>
  )
}
