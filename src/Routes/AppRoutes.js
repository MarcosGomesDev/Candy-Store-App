import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import UserLogin from '../screens/UserScreens/Login';
import UserRegister from '../screens/UserScreens/UserRegister';
import SellerLogin from '../screens/SellerScreens/SellerLogin';
import SellerRegister from '../screens/SellerScreens/SellerRegister/index';
import AddressInfo from '../screens/SellerScreens/SellerRegister/AddressInfo';
import EmailInfo from '../screens/SellerScreens/SellerRegister/EmailInfo';
import ForgotPassword from '../screens/ForgotPassword';
import VerifyToken from '../screens/VerifyToken';
import ResetPassword from '../screens/ResetPassword';

const Stack = createStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
    }}>
      <Stack.Screen name="Login" component={UserLogin} />
      <Stack.Screen name="UserRegister" component={UserRegister} />
      <Stack.Screen name="addressInfo" component={AddressInfo} />
      <Stack.Screen name="EmailInfo" component={EmailInfo} />
      <Stack.Screen name="SellerLogin" component={SellerLogin} />
      <Stack.Screen name="SellerRegister" component={SellerRegister} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyToken" component={VerifyToken} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}
