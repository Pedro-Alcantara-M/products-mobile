import React from 'react';
import {render} from '@testing-library/react-native';
import LoadingScreen from './loading';

describe('LoadingScreen', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(<LoadingScreen />);

    const activityIndicator = getByTestId('activity-indicator');
    expect(activityIndicator).toBeTruthy();

    const container = getByTestId('container');
    expect(container).toBeTruthy();
  });
});
