import React, {FC, useState} from 'react';
import {Button, Alert} from 'react-native';
import {Container, Input, Title} from './styles';
import {signup} from '../../service/auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';

type SignupScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;
type data = {
  name?: string;
  email?: string;
  password?: string;
};

const SignupScreen: FC<SignupScreenProps> = ({navigation}) => {
  const [data, setData] = useState<data | null>(null);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (!data?.name || !data?.email || !data?.password || !confirmPassword) {
      Alert.alert('Error', 'Todos os campos precisam ser preenchidos');
      return;
    }

    if (data?.password !== confirmPassword) {
      Alert.alert('Error', 'Senhas nao conferem');
      return;
    }

    const response = await signup(data);

    if (response.status === 201) {
      Alert.alert('Sucesso', 'Usuário criado com sucesso!');
      navigation.navigate('ButtonTab', {screen: 'Home'});
    } else {
      console.log('erro');
    }
  };

  return (
    <Container>
      <Title>Signup</Title>
      <Input
        placeholder="Nome"
        value={data?.name}
        onChangeText={text =>
          setData((prevState: data | null) => ({
            ...prevState,
            name: text || '',
          }))
        }
      />
      <Input
        placeholder="Email"
        value={data?.email}
        onChangeText={text =>
          setData((prevState: data | null) => ({
            ...prevState,
            email: text || '',
          }))
        }
      />
      <Input
        placeholder="Password"
        value={data?.password}
        onChangeText={text =>
          setData((prevState: data | null) => ({
            ...prevState,
            password: text || '',
          }))
        }
        secureTextEntry={true}
      />
      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />
      <Button color={'#6200ee'} title="Sign Up" onPress={handleSignup} />
    </Container>
  );
};

export default SignupScreen;
