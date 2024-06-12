import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SignupScreen from '.';
import {signup} from '../../service/auth';
import {RootStackParamList} from '../../routes';
import {RouteProp} from '@react-navigation/native';

jest.mock('../../service/auth', () => ({
  signup: jest.fn(),
}));

const mockNavigate = jest.fn();

const mockNavigation = {
  navigate: mockNavigate,
  addListener: jest.fn(), // Mock required for useFocusEffect if used
  isFocused: jest.fn(), // Mock required for useFocusEffect if used
  canGoBack: jest.fn(), // Mock if necessary
} as any;

const mockRoute: RouteProp<RootStackParamList, 'Signup'> = {
  key: 'Signup',
  name: 'Signup',
  params: undefined,
};

describe('SignupScreen', () => {
  it('calls signup function with correct data when signup button is pressed', async () => {
    const {getByPlaceholderText, getByText} = render(
      <SignupScreen navigation={mockNavigation} route={mockRoute} />,
    );

    // Fill in input fields
    fireEvent.changeText(getByPlaceholderText('Nome'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password');

    (signup as jest.Mock).mockResolvedValue({status: 201, data: true});

    // Press signup button
    fireEvent.press(getByText('Sign Up'));

    // Assert that signup function is called with correct data
    expect(signup).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    });
  });
});
