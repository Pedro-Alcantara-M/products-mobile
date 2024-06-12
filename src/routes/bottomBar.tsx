/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/home';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes';
import {LabelIcon} from './styles';

const styles = {
  tabBar: {
    backgroundColor: '#6200ee',
    paddingBottom: 5,
  },
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login' | 'Home'
>;

export type TabParamList = {
  Home: undefined;
  logout: undefined;
  Login: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabNavigator: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Tab.Navigator
      initialRouteName={'Login'}
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return (
            <Ionicons
              style={{transform: 'translateY(5px)'}}
              name={iconName}
              size={20}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen
        name="logout"
        component={() => null}
        options={{
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Ionicons name="log-out-outline" size={22} color="white" />
              <LabelIcon>Logout</LabelIcon>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
