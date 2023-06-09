import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
//icons
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';  

import HomeScreen from './Screens/HomeScreen';
import FavoriteScreen from './Screens/FavoriteScreen';
import CardFav from './Component/CardFav';
import { useState, useEffect } from 'react';

export default function App() {
  const Tab = createBottomTabNavigator();

 
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen
        name='Home'

        component={ HomeScreen }
        options={{
        headerShown: true,
        tabBarIcon: ({ color, size, focused }) => <MaterialCommunityIcons name="dog" size={24} color="black" />
          }}
       >
      </Tab.Screen>
      <Tab.Screen
        name='Favorite'
        component={ FavoriteScreen }
        options={{
        headerShown: true,
        tabBarIcon: ({ color, size, focused }) => <MaterialIcons name="favorite" size={24} color="black" />
          }}
       >
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
