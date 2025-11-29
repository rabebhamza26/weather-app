import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeatherSearchScreen from '../screens/WeatherSearchScreen';

export type AppStackParamList = {
  WeatherSearch: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WeatherSearch" component={WeatherSearchScreen} options={{ title: 'Weather' }} />
    </Stack.Navigator>
  );
};

export default AppStack;
