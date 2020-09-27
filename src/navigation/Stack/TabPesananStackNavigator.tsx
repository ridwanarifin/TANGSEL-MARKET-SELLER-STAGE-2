import * as React from 'react';
import * as RN from 'react-native';

import { PesananStackParamList } from '../../types';
import PesananMasuk from '../../screens/Pesanan/PesananMasuk';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import DetilPesanan from '../../screens/Pesanan/DetilPesanan';

const TabPesananStack = createNativeStackNavigator<PesananStackParamList>();
export default function TabPesananStackNavigator () {
  return (
    <TabPesananStack.Navigator>
      <TabPesananStack.Screen
        name="PesananMasukScreen"
        component={PesananMasuk}
        options={{ title: "Pesanan Masuk" }}
      />
      <TabPesananStack.Screen
        name="DetilPesananScreen"
        component={DetilPesanan}
        options={{ title: "Detil Pemesanan" }}
      />
    </TabPesananStack.Navigator>
  )
}
