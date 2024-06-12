import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  padding: 20px;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #6200ee;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #fff;
`;

export const ButtonText = styled.Button`
  color: #fff;
  font-size: 18px;
  width: 100%;
  background-color: 'blue';
`;
