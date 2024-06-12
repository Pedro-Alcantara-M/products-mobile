import React from 'react';
//import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './bottomBar';
import LoginScreen from '../screens/login';
import ProductCreate from '../screens/products/create/create';
import ProductEdit from '../screens/products/edit/edit';
import SignupScreen from '../screens/signup';
import {TabParamList} from './bottomBar';
import {Product} from '../hooks/useProducts';

export type RootStackParamList = {
  Home: undefined;
  Details: {itemId: number; otherParam: string} | undefined;
  Login: undefined;
  Signup: undefined;
  CreateProduct: undefined;
  EditProduct: {data: Product} | undefined;
  ButtonTab: {screen: keyof TabParamList};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{headerShown: false}}
          name="ButtonTab"
          component={BottomTabNavigator}
        />

        <Stack.Screen
          name="CreateProduct"
          component={ProductCreate}
          options={{title: 'Adicionar Produto'}}
        />
        <Stack.Screen
          name="EditProduct"
          component={ProductEdit}
          options={{title: 'Editar Produto'}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
