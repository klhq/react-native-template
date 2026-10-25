import { fireEvent, render, screen } from '@testing-library/react-native';

import ExamplesScreen from '@/app/examples';

describe('ExamplesScreen', () => {
  it('increments and decrements the counter', async () => {
    await render(<ExamplesScreen />);

    expect(screen.getByText('0')).toBeTruthy();

    await fireEvent.press(screen.getByLabelText('increment'));
    await fireEvent.press(screen.getByLabelText('increment'));
    await fireEvent.press(screen.getByLabelText('decrement'));

    expect(screen.getByText('1')).toBeTruthy();
  });

  it('resets the counter', async () => {
    await render(<ExamplesScreen />);

    await fireEvent.press(screen.getByLabelText('increment'));
    await fireEvent.press(screen.getByText('Reset'));

    expect(screen.getByText('0')).toBeTruthy();
  });
});
