import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { BottomTabParamList } from '../../types';
import TabBerandaStackNavigator from '../Stack/TabBerandaStackNavigator';
import TabPesananStackNavigator from '../Stack/TabPesananStackNavigator';



const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Beranda"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Beranda"
        component={TabBerandaStackNavigator}
        options={{
          tabBarIcon: ({ color }) => TabBarIcon({ name: 'home-outline', color: color })
        }}
      />
      <BottomTab.Screen
        name="Pesanan"
        component={TabPesananStackNavigator}
        options={{
          tabBarIcon: ({ color }) => TabBarIcon({ name: "clipboard-outline", color: color })
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}