import * as React from 'react';
import * as RN from 'react-native';

// import { PesananStackParamList } from '../../types';
import Notifikasi from '../../screens/Notifikasi/NotifikasiScreen';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

const TabNotifikasiStack = createNativeStackNavigator();
export default function TabNotifikasiStackNavigator () {
  return (
    <TabNotifikasiStack.Navigator>
      <TabNotifikasiStack.Screen
        name="NotifikasiScreen"
        component={Notifikasi}
        options={{ title: "Notifikasi" }}
      />
    </TabNotifikasiStack.Navigator>
  )
}
