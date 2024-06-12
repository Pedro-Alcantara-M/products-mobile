/* eslint-disable react-native/no-inline-styles */
// screens/HomeScreen.tsx
import React, {useEffect} from 'react';
import {ScrollView, Text, View, Image, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import {
  Container,
  Title,
  Header,
  ButtonAdd,
  ListContainer,
  CardContainer,
  IconButton,
  ContainerIcon,
  TextPrice,
} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {Product, useProducts} from '../../hooks/useProducts';
import LoadingScreen from '../../components/loading/loading';
import {useIsFocused} from '@react-navigation/native';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const isFocused = useIsFocused();
  const {products, getProductList, loading, deleteProduct} = useProducts();

  const deleteProductFunction = async (id: string) => {
    const deleteResponse = await deleteProduct({id});

    if (deleteResponse.status === 200) {
      return getProductList();
    }
  };

  const showDeleteDialog = (id: string) => {
    Alert.alert(
      'Deletar produto',
      'Você tem certeza que deseja deletar este produto?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: () => deleteProductFunction(id),
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const handleEditProduct = (data: Product) => {
    navigation.navigate('EditProduct', {data});
  };

  useEffect(() => {
    getProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <ScrollView>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Container>
          <Header>
            <Title>Produtos</Title>

            <ButtonAdd onPress={() => navigation.navigate('CreateProduct')}>
              <Icon
                name="plus"
                size={15}
                color="white"
                style={{paddingHorizontal: 5}}
              />
              <Text
                style={{color: 'white', fontWeight: 'bold', paddingRight: 5}}>
                NOVO PRODUTO
              </Text>
            </ButtonAdd>
          </Header>

          <ListContainer>
            {(products?.data || []).map((item: Product) => (
              <CardContainer key={item._id}>
                <Image
                  source={{
                    uri: 'https://zippypixels.com/wp-content/uploads/2018/04/Product-box-mockup.jpg',
                  }}
                  width={100}
                  height={100}
                  style={{borderRadius: 8}}
                />
                <View style={{paddingLeft: 10}}>
                  <Text style={{fontWeight: 'bold', fontSize: 16}}>
                    {item.name}
                  </Text>
                  <Text>{item.description}</Text>

                  <TextPrice>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(item.price || 0)}
                  </TextPrice>
                </View>
                <ContainerIcon>
                  <IconButton
                    testID={`edit-button-${item._id}`}
                    onPress={() => handleEditProduct(item)}>
                    <Icon name="edit" size={20} color={'white'} />
                  </IconButton>
                  <IconButton
                    testID={`delete-button-${item._id}`}
                    style={{backgroundColor: 'red'}}
                    onPress={() => showDeleteDialog(item?._id || '')}>
                    <Icon name="delete" size={20} color={'white'} />
                  </IconButton>
                </ContainerIcon>
              </CardContainer>
            ))}
          </ListContainer>
        </Container>
      )}
    </ScrollView>
  );
};

export default HomeScreen;
