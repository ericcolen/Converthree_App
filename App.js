import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

function TelaPrimaria() {
  return (
    <View style={realStyles.viewEx}>
      
    </View>
  );
}

function TelaSecundaria() {
  return (
    <View style={realStyles.viewEx}>
      
    </View>
  );
}

function TelaTerciaria() {
  return (
    <View style={realStyles.viewEx}>
      
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="TP"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a1e',
            borderBottomColor: 'white',
            borderBottomWidth: 0,
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#1a1a1e',
            borderTopWidth: 0,
          },
          
        }}
      >
        <Tab.Screen 
          name="TP" 
          component={TelaPrimaria} 
          options={{
            title: 'Converthree',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
            tabBarLabel: 'Moeda',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="logo-usd" color={color} size={size} />
            ),
            top: {
              color: 'white',
              fontWeight: 'bold'
            }
          }}
        />
        <Tab.Screen 
          name="TS" 
          component={TelaSecundaria} 
          options={{
            title: 'Tradutor',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="language-outline" color={color} size={size} />
            ),
            backgroundColor: '#4285F4',
          }}
        />
        <Tab.Screen 
          name="TT" 
          component={TelaTerciaria} 
          options={{
            title: 'CEP',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const realStyles = StyleSheet.create({
  viewEx: {
    backgroundColor: '#1a1a1efa',
    flex: 1,
    padding: 20,
  },
});