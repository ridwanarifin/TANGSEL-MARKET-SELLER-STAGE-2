import * as React from 'react';
import * as Paper from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabParamList } from '../../types';
import TabBerandaStackNavigator from '../Stack/TabBerandaStackNavigator';
import TabPesananStackNavigator from '../Stack/TabPesananStackNavigator';
import TabNotifikasiStackNavigator from '../Stack/TabNotifikasiStackNavigator';
import TabChatStackNavigator from '../Stack/TabChatStackNavigator'
import TabAccountStackNavigator from '../Stack/TabAccountStackNavigator'



const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  // const colorScheme = useColorScheme();
  const { colors } = Paper.useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Beranda"
      tabBarOptions={{ activeTintColor: colors.link }}
      >
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
        name="Akun"
        component={TabAccountStackNavigator}
        options={{
          tabBarIcon: ({ color }) => TabBarIcon({ name: "account-circle-outline", color: color })
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: string; color: string }) {
  return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}