import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #fefefe;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: black;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 10px;
`;

export const ButtonAdd = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  background-color: #6200ee;
  padding: 5px;
  border-radius: 5px;
`;

export const ListContainer = styled.View`
  width: 100%;
  padding: 10px;
  gap: 10px;
`;

export const CardContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 10px;
  border-width: 1px;
  background-color: #f8f8f8;
  border-radius: 8px;
`;

export const IconButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-width: 1px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border-color: white;
  background-color: blue;
`;

export const ContainerIcon = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-left: auto;
`;

export const TextPrice = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin-top: auto;
`;
