import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { BottomTabParamList } from '../../types';
import TabBerandaStackNavigator from '../Stack/TabBerandaStackNavigator';
import TabPesananStackNavigator from '../Stack/TabPesananStackNavigator';
import TabNotifikasiStackNavigator from '../Stack/TabNotifikasiStackNavigator';
import TabChatStackNavigator from '../Stack/TabChatStackNavigator'
import TabAccountStackNavigator from '../Stack/TabAccountStackNavigator'



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
      <BottomTab.Screen
        name="Notifikasi"
        component={TabNotifikasiStackNavigator}
        options={{
          tabBarIcon: ({ color }) => TabBarIcon({ name: "bell-ring-outline", color: color })
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={TabChatStackNavigator}
        options={{
          tabBarIcon: ({ color }) => TabBarIcon({ name: "chat-outline", color: color })
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={TabAccountStackNavigator}
        options={{
          tabBarIcon: ({ color }) => TabBarIcon({ name: "account-circle-outline", color: color })
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