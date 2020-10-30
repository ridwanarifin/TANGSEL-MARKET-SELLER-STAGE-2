import React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { HomeStackParamList } from '../../types';

import HomeScreen from '../../screens/Beranda/Home/HomeScreen';
import KategoriScreen from '../../screens/Beranda/Kategori/KategoriScreen';
import DetilScreen from '../../screens/Beranda/Detil/DetilScreen';
import TambahProdukScreen from '../../screens/Beranda/Produk/TambahProdukScreen';

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
        name="KategoriScreen"
        component={KategoriScreen}
        options={{ title: 'Kategori' }}
      />

      <TabBerandaStack.Screen
        name="DetilScreen"
        component={DetilScreen}
        options={{ title: 'Detil' }}
      />

      <TabBerandaStack.Screen
        name="TambahProdukScreen"
        component={TambahProdukScreen}
        options={{ title: 'Tambah Produk'}}
        initialParams={{kategori_produk: "Kuliner"}}
      />
    </TabBerandaStack.Navigator>
  )
}
