import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

export const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  height: 40px;
  border-width: 1px;
  border-color: #ddd;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 4px;
`;

export const ContainerActionButtons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 5;
`;
