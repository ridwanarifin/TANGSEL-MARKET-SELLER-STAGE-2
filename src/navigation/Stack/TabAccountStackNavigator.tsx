import * as React from 'react';
import * as RN from 'react-native';

// import { PesananStackParamList } from '../../types';
import Account from '../../screens/Account/AccountScreen';
import HelpCenter from '../../screens/Account/HelpCenter/HelpCenter';
import HelpCenterList from '../../screens/Account/HelpCenter/HelpCenterList';
import HelpCenterListDetail from '../../screens/Account/HelpCenter/HelpCenterListDetail';
import ContactUs from '../../screens/Account/ContactUs/ContactUs';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import PrivacyPolicy from '../../screens/Account/PrivacyPolicy/PrivacyPolicy';
import EditAccount from '../../screens/Account/EditAccount/EditAccount';

const TabAccountStack = createNativeStackNavigator();
export default function TabAccountStackNavigator () {
  return (
    <TabAccountStack.Navigator>
      <TabAccountStack.Screen
        name="AccountScreen"
        component={Account}
        options={{ title: "Account" }}
      />
      <TabAccountStack.Screen
        name="HelpCenter"
        component={HelpCenter}
        options={{ title: "Help Center" }}
      />
      <TabAccountStack.Screen
        name="HelpCenterList"
        component={HelpCenterList}
        options={ ({route}) => ({
          title:route.params.name
        }) }
      />
      <TabAccountStack.Screen
        name="HelpCenterListDetail"
        component={HelpCenterListDetail}
        options={ ({route}) => ({
          title:route.params.name
        }) }
      />
      <TabAccountStack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ title: "Contact Us" }}
      />
      <TabAccountStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ title: "Privacy Policy" }}
      />
      <TabAccountStack.Screen
        name="EditAccount"
        component={EditAccount}
        options={{ title: "Edit Account" }}
      />
    </TabAccountStack.Navigator>
  )
}
