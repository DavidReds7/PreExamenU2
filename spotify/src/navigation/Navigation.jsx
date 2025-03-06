import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PlaylistScreen from '../modules/artist/PlaylistScreen';
import PlayerScreen from '../modules/played/PlayerScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
      <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
    </Stack.Navigator>
  );
}