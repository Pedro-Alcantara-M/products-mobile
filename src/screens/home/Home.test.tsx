// HomeScreen.test.tsx
import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import HomeScreen from '.';
import {useIsFocused} from '@react-navigation/native';
import {useProducts} from '../../hooks/useProducts';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabParamList} from '../../routes/bottomBar';
import {Alert} from 'react-native';

// Mock hooks and navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useIsFocused: jest.fn(),
}));
jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');
jest.mock('../../hooks/useProducts');
jest.mock('@react-navigation/bottom-tabs', () => ({
  __esModule: true,
  createBottomTabNavigator: jest.fn().mockReturnValue({
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

const mockNavigate = jest.fn();

const mockNavigation = {
  navigate: mockNavigate,
};

const mockRoute = {
  key: 'Home',
  name: 'Home',
  params: {},
};

const Stack = createBottomTabNavigator<TabParamList>();

// Create a wrapper component to inject navigation and route props
const HomeScreenWrapper = (props: any) => (
  <HomeScreen {...props} navigation={mockNavigation} route={mockRoute} />
);

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useIsFocused as jest.Mock).mockReturnValue(true);
  });

  const renderComponent = () =>
    render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreenWrapper} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

  it('renders the HomeScreen correctly', () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: {data: []},
      getProductList: jest.fn(),
      loading: false,
      deleteProduct: jest.fn(),
    });

    const {getByText} = renderComponent();

    expect(getByText('Produtos')).toBeTruthy();
    expect(getByText('NOVO PRODUTO')).toBeTruthy();
  });

  it('shows loading screen when loading', () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: {data: []},
      getProductList: jest.fn(),
      loading: true,
      deleteProduct: jest.fn(),
    });

    const {getByTestId} = renderComponent();

    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('displays products correctly', () => {
    const mockProducts = [
      {
        _id: '1',
        name: 'Product 1',
        description: 'Description 1',
        price: 100,
      },
      {
        _id: '2',
        name: 'Product 2',
        description: 'Description 2',
        price: 200,
      },
    ];

    (useProducts as jest.Mock).mockReturnValue({
      products: {data: mockProducts},
      getProductList: jest.fn(),
      loading: false,
      deleteProduct: jest.fn(),
    });

    const {getByText} = renderComponent();

    mockProducts.forEach(product => {
      expect(getByText(product.name)).toBeTruthy();
      expect(getByText(product.description)).toBeTruthy();
      expect(
        getByText(
          new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(product.price),
        ),
      ).toBeTruthy();
    });
  });

  it('navigates to CreateProduct on add button press', () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: {data: []},
      getProductList: jest.fn(),
      loading: false,
      deleteProduct: jest.fn(),
    });

    const {getByText} = renderComponent();

    fireEvent.press(getByText('NOVO PRODUTO'));

    expect(mockNavigate).toHaveBeenCalledWith('CreateProduct');
  });

  it('navigates to EditProduct on edit button press', () => {
    const mockProduct = {
      _id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
    };

    (useProducts as jest.Mock).mockReturnValue({
      products: {data: [mockProduct]},
      getProductList: jest.fn(),
      loading: false,
      deleteProduct: jest.fn(),
    });

    const {getByTestId} = renderComponent();

    fireEvent.press(getByTestId(`edit-button-${mockProduct._id}`));

    expect(mockNavigate).toHaveBeenCalledWith('EditProduct', {
      data: mockProduct,
    });
  });

  it('shows delete confirmation dialog and deletes product', async () => {
    const mockProduct = {
      _id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
    };

    const mockDeleteProduct = jest.fn().mockResolvedValue({status: 200});
    (useProducts as jest.Mock).mockReturnValue({
      products: {data: [mockProduct]},
      getProductList: jest.fn(),
      loading: false,
      deleteProduct: mockDeleteProduct,
    });

    jest.spyOn(Alert, 'alert');

    const {getByTestId} = renderComponent();

    fireEvent.press(getByTestId(`delete-button-${mockProduct._id}`));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Deletar produto',
      'Você tem certeza que deseja deletar este produto?',
      [
        expect.objectContaining({text: 'Cancelar'}),
        expect.objectContaining({
          text: 'Deletar',
          onPress: expect.any(Function),
        }),
      ],
      {cancelable: true},
    );

    const [, {onPress}] = (Alert.alert as jest.Mock).mock.calls[0][2];
    await waitFor(() => onPress());

    expect(mockDeleteProduct).toHaveBeenCalledWith({id: mockProduct._id});
  });
});
