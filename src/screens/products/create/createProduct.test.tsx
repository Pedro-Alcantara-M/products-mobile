// ProductCreateScreen.test.tsx

import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {useProducts} from '../../../hooks/useProducts';
import ProductCreate from './create';

// Mocking the useProducts hook
jest.mock('../../../hooks/useProducts', () => ({
  useProducts: jest.fn(() => ({
    addProduct: jest.fn(),
  })),
}));

describe('ProductCreateScreen', () => {
  it('renders correctly', () => {
    const {getByPlaceholderText, getByTestId} = render(<ProductCreate />);

    expect(getByPlaceholderText('Digitar nome')).toBeTruthy();
    expect(getByPlaceholderText('Digitar descrição')).toBeTruthy();
    expect(getByPlaceholderText('Digitar preço')).toBeTruthy();
    expect(getByTestId('add-product')).toBeTruthy();
  });

  it('handles input changes correctly', () => {
    const {getByPlaceholderText} = render(<ProductCreate />);

    const nameInput = getByPlaceholderText('Digitar nome');
    const descriptionInput = getByPlaceholderText('Digitar descrição');
    const priceInput = getByPlaceholderText('Digitar preço');

    fireEvent.changeText(nameInput, 'Test Product');
    fireEvent.changeText(descriptionInput, 'This is a test product');
    fireEvent.changeText(priceInput, '10.99');

    expect(nameInput.props.value).toBe('Test Product');
    expect(descriptionInput.props.value).toBe('This is a test product');
    expect(priceInput.props.value).toBe('10.99');
  });

  it('calls addProduct function when button is pressed', () => {
    const addProductMock = jest.fn();
    (useProducts as jest.Mock).mockReturnValue({addProduct: addProductMock});
    const {getByTestId, getByPlaceholderText} = render(<ProductCreate />);

    const nameInput = getByPlaceholderText('Digitar nome');
    const descriptionInput = getByPlaceholderText('Digitar descrição');
    const priceInput = getByPlaceholderText('Digitar preço');

    fireEvent.changeText(nameInput, 'Test Product');
    fireEvent.changeText(descriptionInput, 'This is a test product');
    fireEvent.changeText(priceInput, '10.99');

    fireEvent.press(getByTestId('add-product'));

    expect(addProductMock).toHaveBeenCalled();
  });
});
