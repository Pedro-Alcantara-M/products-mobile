// src/screens/ProductCreateScreen.tsx
import React, {useState} from 'react';
import {Button, Alert} from 'react-native';
import {Product, useProducts} from '../../../hooks/useProducts';
import {Container, Label, Input} from '../styles';

const ProductCreate: React.FC = ({navigation}: any) => {
  const {addProduct} = useProducts();
  const [data, setData] = useState<Product | null>(null);

  const handleCreateProduct = async () => {
    if (!data) {
      Alert.alert('Error', 'Both fields are required.');
      return;
    }
    const createResponse = await addProduct(data);

    if (createResponse?.status === 201) {
      setData(null);
      Alert.alert('Sucesso', 'Produto criado com sucesso!');
      navigation.navigate('ButtonTab', {screen: 'Home'});
    } else {
      Alert.alert('Error', 'Erro ao criar o produto');
    }
  };

  return (
    <Container>
      <Label>Nome</Label>
      <Input
        placeholder="Digitar nome"
        value={data?.name}
        onChangeText={text => setData(state => ({...state, name: text}))}
      />
      <Label>Descrição</Label>
      <Input
        placeholder="Digitar descrição"
        value={data?.description}
        onChangeText={text => setData(state => ({...state, description: text}))}
        multiline
        numberOfLines={4}
      />
      <Label>Preço</Label>
      <Input
        placeholder="Digitar preço"
        value={data?.price?.toString()}
        onChangeText={number => {
          const numericPrice = parseFloat(number);
          setData(state => ({...state, price: numericPrice}));
        }}
        keyboardType="numeric"
      />
      <Button
        testID="add-product"
        title="Adicionar produto"
        onPress={handleCreateProduct}
      />
    </Container>
  );
};

export default ProductCreate;
