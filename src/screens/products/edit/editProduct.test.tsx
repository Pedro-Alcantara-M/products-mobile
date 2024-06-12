import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ProductEdit from './edit';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useProducts as mockUseProducts} from '../../../hooks/useProducts';

jest.mock('../../../hooks/useProducts', () => ({
  __esModule: true,
  useProducts: jest.fn(),
}));

const useProducts = mockUseProducts as jest.Mock;

const Stack = createNativeStackNavigator();

jest.mock('@react-navigation/native-stack', () => ({
  __esModule: true,
  createNativeStackNavigator: jest.fn().mockReturnValue({
    Navigator: ({children}: {children: React.ReactNode}) => <>{children}</>,
    Screen: ({
      //name,
      component,
    }: {
      name: string;
      component: React.ComponentType;
    }) => {
      const Component = component;
      return <Component />;
    },
  }),
}));

describe('ProductEdit', () => {
  it('calls editProduct function when edit button is pressed', async () => {
    const editProductMock = jest.fn();
    (useProducts as jest.Mock).mockReturnValue({editProduct: editProductMock});

    const routeParams = {
      params: {
        data: {
          _id: '1',
          name: 'Product 1',
          description: 'Description',
          price: 10,
        },
      },
    };

    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };

    const {getByPlaceholderText, getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ProductEdit"
            component={(props: any) => (
              <ProductEdit
                {...(props as any)}
                route={routeParams}
                navigation={navigation}
              />
            )}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    fireEvent.changeText(
      getByPlaceholderText('Digite o nome'),
      'Updated Product',
    );
    fireEvent.changeText(
      getByPlaceholderText('Digite a descrição'),
      'Updated Description',
    );
    fireEvent.changeText(getByPlaceholderText('Digite o preço'), '20');

    fireEvent.press(getByTestId('edit-product'));

    expect(editProductMock).toHaveBeenCalledWith('1', {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 20,
    });
  });
});
