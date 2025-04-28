import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TrackingScreen } from './screens/TrackingScreen';
import './global.css';
import { HistoryScreen } from './screens/HistoryScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecordScreen } from './screens/RecordScreen';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tabs></Tabs>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator initialRouteName='Tracking'>
      <Tab.Screen name="Tracking" component={Tracking} options={{ headerShown: false, title: 'Tracking' }} />
      <Tab.Screen name="HistoryScreen" component={HistoryScreen} options={{ headerShown: false, title: 'History' }} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
export type ScreenNames = ['TrackingScreen', 'RecordScreen'];
export type TrackingStackParamList = Record<ScreenNames[number], any>;
export type TrackingNavigation = NavigationProp<TrackingStackParamList>;
function Tracking() {
  return (
    <Stack.Navigator initialRouteName='TrackingScreen'>
      <Stack.Screen name="TrackingScreen" component={TrackingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RecordScreen" component={RecordScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}


export default App;
