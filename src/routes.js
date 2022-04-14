import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'

import Main from './screens/Main';
import Login from './screens/Login';
import UserRegister from './screens/User/UserRegister';
import SellerRegister from './screens/Seller/SellerRegister'

import CustomDrawer from './components/CustomDrawer'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

function MyDrawer() {
    return (
        <Drawer.Navigator screenOptions={{headerShown: false}} drawerContent={props => <CustomDrawer {...props} />}>
            <Drawer.Screen name="Home" component={Main} />
        </Drawer.Navigator>
    )
}

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Main"
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Main" component={MyDrawer} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="UserRegister" component={UserRegister} />
                <Stack.Screen name="SellerRegister" component={SellerRegister} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;