import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TrackingScreen } from './screens/TrackingScreen';
import './global.css';
import { HistoryScreen } from './screens/HistoryScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecordEatingScreen } from './screens/RecordEatingScreen';
import { RecordSleepingScreen } from './screens/RecordSleepingScreen';
import { RecordPoopScreen } from './screens/RecordPoopScreen';
import { Text } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { HistoryDetailScreen } from './screens/HistoryDetailScreen';

export const storage = new MMKV();
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
      <Tab.Screen name="Tracking" component={Tracking} options={{ headerShown: false, title: 'Tracking', tabBarIcon: () => (<Text>💩</Text>), tabBarActiveTintColor: '#30638E' }} />
      <Tab.Screen name="History" component={History} options={{ headerShown: false, title: 'History', tabBarIcon: () => (<Text>📈</Text>), tabBarActiveTintColor: '#30638E' }} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
export type ScreenNames = ['TrackingScreen', 'RecordEatingScreen', 'RecordSleepingScreen', 'RecordPoopScreen'];
export type TrackingStackParamList = Record<ScreenNames[number], any>;
export type TrackingNavigation = NavigationProp<TrackingStackParamList>;
function Tracking() {
  return (
    <Stack.Navigator initialRouteName='TrackingScreen'>
      <Stack.Screen name="TrackingScreen" component={TrackingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RecordEatingScreen" component={RecordEatingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RecordSleepingScreen" component={RecordSleepingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RecordPoopScreen" component={RecordPoopScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}


const HistoryStack = createNativeStackNavigator();
export type HistoryScreenNames = ['HistoryScreen', 'HistoryDetailScreen'];
export type HistoryStackParamList = Record<HistoryScreenNames[number], any>;
export type HistoryNavigation = NavigationProp<HistoryStackParamList>;
function History() {
  return (
    <HistoryStack.Navigator initialRouteName='HistoryScreen'>
      <HistoryStack.Screen name="HistoryScreen" component={HistoryScreen} options={{ headerShown: false }} />
      <HistoryStack.Screen name="HistoryDetailScreen" component={HistoryDetailScreen} options={{ headerShown: false, presentation:'modal' }} />
    </HistoryStack.Navigator>
  )
}


export default App;
