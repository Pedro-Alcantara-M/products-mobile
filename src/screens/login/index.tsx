// src/screens/LoginScreen.tsx
import React, {useState} from 'react';
import useAuth from '../../hooks/useAuth';
import {Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import {execLogin} from '../../service/auth';
import {
  Container,
  Title,
  Input,
  LoginButton,
  ButtonText,
  TextStyled,
} from './styles';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const {setToken} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Both fields are required.');
      return;
    }
    const response = await execLogin({email, password});

    if (response.status === 201) {
      setToken(response.data.token);
      navigation.navigate('ButtonTab', {screen: 'Home'});
    } else {
      Alert.alert('Invalid Credentials');
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <LoginButton onPress={handleLogin}>
        <ButtonText testID="login-button">Login</ButtonText>
      </LoginButton>

      <TextStyled>
        Ainda não tem conta?{' '}
        <ButtonText
          // eslint-disable-next-line react-native/no-inline-styles
          style={{color: 'blue', textDecorationLine: 'underline'}}
          onPress={() => navigation.navigate('Signup')}>
          Criar conta
        </ButtonText>
      </TextStyled>
    </Container>
  );
};

export default LoginScreen;
