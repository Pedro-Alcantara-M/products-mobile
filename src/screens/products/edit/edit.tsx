// src/screens/ProductCreateScreen.tsx
import React, {useState} from 'react';
import {Button, Alert} from 'react-native';
import {Product, useProducts} from '../../../hooks/useProducts';
import {Container, Label, Input, ContainerActionButtons} from '../styles';

const ProductEdit: React.FC = ({route, navigation}: any) => {
  const {editProduct} = useProducts();
  const {
    _id,
    name: currentName,
    description: currentDescripiton,
    price: currentPrice,
  } = route.params.data;
  const [name, setName] = useState<string>(currentName);
  const [description, setDescription] = useState<string>(currentDescripiton);
  const [price, setPrice] = useState<number>(currentPrice);
  const [data, setData] = useState<Product | null>(null);

  const handleEditProduct = async () => {
    if (data) {
      const updateResponse = await editProduct(_id, data);

      if (updateResponse?.status === 200) {
        navigation.navigate('ButtonTab', {screen: 'Home'});
      } else {
        Alert.alert('Error', 'Erro ao atulizar o produto');
      }
    } else {
      Alert.alert('Error', 'Nenhuma alteração realizada');
    }
  };

  return (
    <Container>
      <Label>Nome</Label>
      <Input
        placeholder="Digite o nome"
        value={name}
        onChangeText={text => {
          setName(text);
          setData(state => ({...state, name: text}));
        }}
      />
      <Label>Descrição</Label>
      <Input
        placeholder="Digite a descrição"
        value={description}
        onChangeText={text => {
          setData(state => ({...state, description: text}));
          setDescription(text);
        }}
        multiline
        numberOfLines={4}
      />
      <Label>Preço</Label>
      <Input
        placeholder="Digite o preço"
        value={price + ''}
        onChangeText={number => {
          const numericPrice = parseFloat(number);
          setData(state => ({...state, price: numericPrice}));
          setPrice(numericPrice);
        }}
        keyboardType="numeric"
      />
      <ContainerActionButtons>
        <Button
          title="Cancelar"
          onPress={() => navigation.goBack()}
          color={'red'}
        />
        <Button
          testID="edit-product"
          title="Editar"
          onPress={handleEditProduct}
        />
      </ContainerActionButtons>
    </Container>
  );
};

export default ProductEdit;
