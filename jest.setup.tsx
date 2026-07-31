// @expo/vector-icons loads font glyphs asynchronously, which triggers act()
// warnings in tests since nothing awaits that load. Icons aren't worth
// rendering for real in unit tests, so swap them for a plain <Text>.
jest.mock('@expo/vector-icons', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- jest.mock factories can't close over module-level imports
  const { Text } = require('react-native');
  const MockIcon = ({ name }: { name?: string }) => <Text>{name}</Text>;

  return new Proxy(
    {},
    {
      get: () => MockIcon,
    },
  );
});
