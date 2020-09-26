import React from 'react'

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { HomeStackParamList } from '../../types';

import HomeScreen from '../../screens/Beranda/Home/Home.screen';
import JasaKirimScreen from '../../screens/Beranda/JasaKirim/JasaKirim.screen';
import JasaKirimDetilScreen from '../../screens/Beranda/JasaKirim/JasaKirimDetil.screen';
import KategoriScreen from '../../screens/Beranda/Kategori/Kategori.screen';
import DetilScreen from '../../screens/Beranda/Detil/DetilScreen';

const TabBerandaStack = createNativeStackNavigator<HomeStackParamList>();
export default function TabBerandaStackNavigator () {
  return (
    <TabBerandaStack.Navigator>
      <TabBerandaStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Profil Toko' }}
      />
      <TabBerandaStack.Screen
        name="JasaKirimScreen"
        component={JasaKirimScreen}
        options={{ title: 'Jasa Kirim' }}
      />
      <TabBerandaStack.Screen
        name="JasaKirimDetilScreen"
        component={JasaKirimDetilScreen}
        initialParams={{ title: 'Jasa Kirim dalam Tangsel'}}
        options={({ route }) => ({ title: route.params.title })}
      />
      <TabBerandaStack.Screen
        name="KategoriScreen"
        component={KategoriScreen}
        options={{ title: 'Kategori' }}
      />

      <TabBerandaStack.Screen
        name="DetilScreen"
        component={DetilScreen}
        options={{ title: 'Detil' }}
      />
    </TabBerandaStack.Navigator>
  )
}
