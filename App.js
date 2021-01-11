import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HintHome from './src/HintHome';
import HintSetting from './src/HintSetting';

const Stack = createStackNavigator();

const App: () => React$Node = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HintHome"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen 
          name="HintHome" 
          component={HintHome}
          options={{
            navigation: navigation
          }}
        />
        <Stack.Screen
          name="HintSetting"
          component={HintSetting}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
