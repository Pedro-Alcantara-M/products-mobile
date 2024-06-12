import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Container} from './styles';

const LoadingScreen = () => {
  return (
    <Container testID="container">
      <ActivityIndicator
        testID="activity-indicator"
        size="large"
        color="#0000ff"
      />
    </Container>
  );
};

export default LoadingScreen;
