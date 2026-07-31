import { fireEvent, render, screen } from '@testing-library/react-native';

import { ExamplesScreen } from './ExamplesScreen';

describe('ExamplesScreen', () => {
  it('increments and decrements the counter', () => {
    render(<ExamplesScreen />);

    expect(screen.getByText('0')).toBeTruthy();

    fireEvent.press(screen.getByLabelText('increment'));
    fireEvent.press(screen.getByLabelText('increment'));
    fireEvent.press(screen.getByLabelText('decrement'));

    expect(screen.getByText('1')).toBeTruthy();
  });

  it('resets the counter', () => {
    render(<ExamplesScreen />);

    fireEvent.press(screen.getByLabelText('increment'));
    fireEvent.press(screen.getByText('Reset'));

    expect(screen.getByText('0')).toBeTruthy();
  });
});
