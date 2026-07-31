# React Native Template

An Expo + TypeScript starter tuned for two things: working comfortably in VSCode, and being ready to go in under a minute for a live coding interview.

## Stack

- [Expo](https://docs.expo.dev/) (SDK 57) — no Xcode/Android Studio required to get running
- TypeScript, strict mode
- [React Navigation](https://reactnavigation.org/) — native stack + bottom tabs, already wired up
- [Jest](https://jestjs.io/) + [`jest-expo`](https://docs.expo.dev/develop/unit-testing/) + [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) — 8 passing example tests
- ESLint (flat config, `eslint-config-expo`) + Prettier
- Path alias: `@/*` → `src/*`

## Quickstart

```bash
npm install
npm start
```

Then pick a target:

- Press `i` for iOS Simulator, `a` for Android Emulator, `w` for web — or scan the QR code with [Expo Go](https://expo.dev/go) on a physical phone.
- No simulator installed? Web (`w`) always works and is the fastest fallback in an interview.

### Useful scripts

| Command                | What it does                                  |
| ----------------------- | ---------------------------------------------- |
| `npm start`             | Start the Expo dev server                      |
| `npm test`              | Run the Jest suite once                         |
| `npm run test:watch`    | Run Jest in watch mode                          |
| `npm run lint`          | ESLint                                          |
| `npm run lint:fix`      | ESLint with autofix                             |
| `npm run format`        | Prettier, write mode                            |
| `npm run typecheck`     | `tsc --noEmit`                                  |
| `npm run check`         | typecheck + lint + test, in that order          |

## Project structure

```
App.tsx                     entry point — renders RootNavigator
src/
  navigation/
    RootNavigator.tsx        native stack: Tabs -> Details
    TabNavigator.tsx         bottom tabs: Home, Settings
    types.ts                 typed param lists for both navigators
  screens/
    HomeScreen.tsx            list navigating to Details, link to Examples
    DetailsScreen.tsx
    ExamplesScreen.tsx        counter + both Button variants, kept separate so it's a one-file delete
    SettingsScreen.tsx
  components/
    Button.tsx                small reusable component, with a test alongside it
  hooks/
    useCounter.ts              small reusable hook, with a test alongside it
```

Tests live next to the file they cover (`Button.tsx` / `Button.test.tsx`), not in a parallel `__tests__` tree — easier to find mid-interview.

## VSCode setup

Opening the folder will prompt you to install the recommended extensions (`.vscode/extensions.json`):

- **Expo Tools** — Expo-aware diagnostics and commands
- **ESLint** / **Prettier** — format-on-save and fix-on-save are already enabled in `.vscode/settings.json`
- **Jest** (Orta) — inline pass/fail gutter icons and a Testing sidebar, no terminal needed
- **GitLens** — optional, useful for narrating history during a review-the-code style interview

### Debugging

- `.vscode/launch.json` has **Debug Jest Tests** and **Debug Current Test File** — set a breakpoint in a test or in the source it exercises, hit F5, done.
- To debug the running app itself, start the dev server (`npm start`) and press `j` in the terminal — this opens React Native DevTools (Chrome DevTools-based), which supports breakpoints, network inspection, and console access against the Hermes engine.

### Snippets (`.vscode/rn.code-snippets`)

- `rnc` → scaffolds a typed functional component (props type + `StyleSheet.create`)
- `rntest` → scaffolds a React Native Testing Library test file for the current filename

## Interview cheatsheet

**Add a screen:**
1. Create `src/screens/YourScreen.tsx`.
2. Add it to `RootStackParamList` or `TabParamList` in `src/navigation/types.ts`.
3. Register it as a `<Stack.Screen>` / `<Tab.Screen>` in `RootNavigator.tsx` / `TabNavigator.tsx`.

**Navigate with params:**
```tsx
navigation.navigate('Details', { itemId: 1, title: 'Example' });
```
`route.params` is fully typed on the receiving screen via `RootStackScreenProps<'Details'>`.

**Fetch data:** nothing is pre-wired (no React Query/SWR) — use `useEffect` + `fetch`, or ask if the interviewer wants a data-fetching library added; it's a two-minute `npm install` away.

**State beyond one screen:** lift state into a parent, or reach for `useContext` — no global store is pre-installed on purpose, so you can make (and explain) that call live.

**Testing pattern used throughout:**
```tsx
import { render, screen, fireEvent } from '@testing-library/react-native';

render(<Thing />);
fireEvent.press(screen.getByRole('button'));
expect(screen.getByText('...')).toBeTruthy();
```
See `src/components/Button.test.tsx` (isolated component), `src/hooks/useCounter.test.ts` (hook via `renderHook`), and `src/screens/HomeScreen.test.tsx` (full navigator tree) for three levels of test scope to copy from.

**Not building a counter/examples screen?** Delete `src/screens/ExamplesScreen.tsx` and `ExamplesScreen.test.tsx`, remove `Examples` from `RootStackParamList` in `src/navigation/types.ts`, and remove its `<Stack.Screen>` in `RootNavigator.tsx` and the button in `HomeScreen.tsx`.

## Notes

- `@expo/vector-icons` is mocked out in tests (`jest.setup.tsx`) — its async font loading otherwise spams `act()` warnings unrelated to anything you'll be testing.
- `ios/` and `android/` are not generated — this stays on the Expo managed workflow. Run `npx expo prebuild` only if a native module actually requires it.
