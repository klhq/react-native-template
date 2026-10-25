import { fireEvent, renderRouter, screen } from 'expo-router/testing-library';

describe('navigation', () => {
  it('renders every list item on the home tab', async () => {
    await renderRouter('./src/app');

    expect(screen).toHavePathname('/');
    expect(screen.getByText('First item')).toBeTruthy();
    expect(screen.getByText('Second item')).toBeTruthy();
    expect(screen.getByText('Third item')).toBeTruthy();
  });

  it('opens the details screen for a pressed item', async () => {
    await renderRouter('./src/app');

    await fireEvent.press(screen.getByText('First item'));

    expect(screen).toHavePathname('/details/1');
    expect(screen.getByText('Item id: 1')).toBeTruthy();
  });

  it('opens the examples screen', async () => {
    await renderRouter('./src/app');

    await fireEvent.press(screen.getByText('Examples'));

    expect(screen).toHavePathname('/examples');
    expect(
      screen.getByText('Counter state via useCounter, plus both Button variants.'),
    ).toBeTruthy();
  });
});
