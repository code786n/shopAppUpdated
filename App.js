import React, {Component} from 'react';
import {View} from 'react-native';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const AuthStackNav = createStackNavigator();
const App=()=> {
  const AuthStack = () => {
    return (
          <AuthStackNav.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
          headerShown: false,
          }}>
          
          <AuthStackNav.Screen name="LoginScreen" component={LoginScreen} />
          <AuthStackNav.Screen name="ProductScreen" component={ProductScreen} />
          </AuthStackNav.Navigator>
    );
    };

  
    return (
      <NavigationContainer>
        <AuthStack /> 
        </NavigationContainer>
    );
  }

  export default App;