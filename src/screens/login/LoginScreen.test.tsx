// src/screens/__tests__/LoginScreen.test.tsx
import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '.';
import useAuth from '../../hooks/useAuth';
import {execLogin} from '../../service/auth';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../routes';

jest.mock('../../hooks/useAuth');

jest.mock('../../service/auth');

const mockNavigate = jest.fn();

const mockNavigation = {
  navigate: mockNavigate,
  addListener: jest.fn(), // Mock required for useFocusEffect if used
  isFocused: jest.fn(), // Mock required for useFocusEffect if used
  canGoBack: jest.fn(), // Mock if necessary
} as any;

// Mock route prop for the Login screen
const mockRoute: RouteProp<RootStackParamList, 'Login'> = {
  key: 'Login',
  name: 'Login',
  params: undefined,
};

const mockSetToken = jest.fn();

(useAuth as unknown as jest.Mock).mockReturnValue({setToken: mockSetToken});

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login screen correctly', () => {
    const {getByPlaceholderText, getByTestId} = render(
      <NavigationContainer>
        <LoginScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByTestId('login-button')).toBeTruthy();
  });

  it('shows an alert when fields are empty', () => {
    const alertSpy = jest.spyOn(Alert, 'alert');

    const {getByTestId} = render(
      <NavigationContainer>
        <LoginScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );

    fireEvent.press(getByTestId('login-button'));

    expect(alertSpy).toHaveBeenCalledWith('Error', 'Both fields are required.');
  });

  it('navigates to Home screen on successful login', async () => {
    (execLogin as jest.Mock).mockResolvedValue({
      status: 201,
      data: {token: 'dummy-token'},
    });

    const {getByPlaceholderText, getByTestId} = render(
      <NavigationContainer>
        <LoginScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(mockSetToken).toHaveBeenCalledWith('dummy-token');
      expect(mockNavigate).toHaveBeenCalledWith('ButtonTab', {screen: 'Home'});
    });
  });

  it('shows an alert on invalid credentials', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    (execLogin as jest.Mock).mockResolvedValue({status: 401, data: {}});

    const {getByPlaceholderText, getByTestId} = render(
      <NavigationContainer>
        <LoginScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Invalid Credentials');
    });
  });
});
