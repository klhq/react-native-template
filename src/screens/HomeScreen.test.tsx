import { fireEvent, render, screen } from '@testing-library/react-native';

import { RootNavigator } from '@/navigation/RootNavigator';

describe('HomeScreen', () => {
  it('renders every list item', () => {
    render(<RootNavigator />);

    expect(screen.getByText('First item')).toBeTruthy();
    expect(screen.getByText('Second item')).toBeTruthy();
    expect(screen.getByText('Third item')).toBeTruthy();
  });

  it('navigates to the details screen when a list item is pressed', () => {
    render(<RootNavigator />);

    fireEvent.press(screen.getByText('First item'));

    expect(screen.getByText('Item id: 1')).toBeTruthy();
  });

  it('navigates to the examples screen', () => {
    render(<RootNavigator />);

    fireEvent.press(screen.getByText('Examples'));

    expect(screen.getByText('Counter state via useCounter, plus both Button variants.')).toBeTruthy();
  });
});
