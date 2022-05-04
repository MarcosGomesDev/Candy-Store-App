import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import { DEFAULT_SCREEN_OPTIONS } from '../options'
import stackScreens from './screens'

const { Navigator, Screen } = createStackNavigator()

const INITIAL_ROUTE = stackScreens[0]

function AppStack() {
    return (
        <Navigator
            initialRouteName='Main'
            screenOptions={DEFAULT_SCREEN_OPTIONS}
        >
            {stackScreens.map(({ name, component }) => <Screen {...{ key: name, name, component }} />)}
        </Navigator>
    )
}

export default AppStack;