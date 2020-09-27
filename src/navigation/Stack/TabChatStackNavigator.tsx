import * as React from 'react';
import * as RN from 'react-native';

// import { PesananStackParamList } from '../../types';
import Chat from '../../screens/Chat/ChatScreen';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

const TabChatStack = createNativeStackNavigator();
export default function TabChatStackNavigator () {
  return (
    <TabChatStack.Navigator>
      <TabChatStack.Screen
        name="ChatScreen"
        component={Chat}
        options={{ title: "Chat" }}
      />
    </TabChatStack.Navigator>
  )
}
