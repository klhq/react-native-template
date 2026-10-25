# React Native Template

An Expo + TypeScript starter tuned for two things: working comfortably in VSCode, and being ready to go in under a minute for a live coding interview.

## Stack

- [Expo](https://docs.expo.dev/) SDK 58 (React Native 0.88, React 19.3): no Xcode or Android Studio required to get running
- TypeScript, strict mode
- [Expo Router](https://docs.expo.dev/router/introduction/): file-based routes under `src/app/`, with a stack, bottom tabs, and typed routes
- [Jest](https://jestjs.io/) 30 + [`jest-expo`](https://docs.expo.dev/develop/unit-testing/) + [React Native Testing Library](https://oss.callstack.com/react-native-testing-library/) 14, with 10 passing example tests
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) with Expo's own lint rules loaded as a JS plugin, + Prettier
- pnpm with a pinned version, Node from `.node-version`
- Path alias: `@/*` → `src/*`

## Quickstart

```bash
fnm use
pnpm install
pnpm start
```

Then pick a target:

- Press `i` for iOS Simulator, `a` for Android Emulator, `w` for web, or scan the QR code with [Expo Go](https://expo.dev/go) on a physical phone. Expo Go from the stores runs SDK 58.
- No simulator installed? Web (`w`) always works and is the fastest fallback in an interview.

### Useful scripts

| Command               | What it does                                          |
| --------------------- | ----------------------------------------------------- |
| `pnpm start`          | Start the Expo dev server                             |
| `pnpm test`           | Run the Jest suite once                               |
| `pnpm run test:watch` | Run Jest in watch mode                                |
| `pnpm run lint`       | Oxlint, warnings fail                                 |
| `pnpm run lint:fix`   | Oxlint with autofix                                   |
| `pnpm run format`     | Prettier, write mode                                  |
| `pnpm run typecheck`  | `tsc --noEmit`                                        |
| `pnpm run check`      | typecheck + lint + format check + test, in that order |

Add Expo packages with `pnpm exec expo install <package>` so the version matches the SDK.

## Project structure

```
src/
  app/                      Expo Router routes; every file is a screen
    _layout.tsx              root stack: tabs, details, examples
    (tabs)/
      _layout.tsx            bottom tabs: Home, Settings
      index.tsx              Home: list navigating to details, link to examples
      settings.tsx
    details/[id].tsx         dynamic route with an id segment and a title param
    examples.tsx             counter + both Button variants, kept separate so it's a one-file delete
  components/
    Button.tsx               small reusable component, with a test alongside it
  hooks/
    useCounter.ts            small reusable hook, with a test alongside it
  __tests__/
    navigation.test.tsx      full router tree via renderRouter
    examples.test.tsx
```

Component and hook tests live next to the file they cover. Expo Router treats every file in `src/app/` as a route, so route tests live in `src/__tests__/`.

## VSCode setup

Opening the folder will prompt you to install the recommended extensions (`.vscode/extensions.json`):

- **Expo Tools**: Expo-aware diagnostics and commands
- **Oxc** / **Prettier**: format-on-save and fix-on-save are already enabled in `.vscode/settings.json`
- **Jest** (Orta): inline pass/fail gutter icons and a Testing sidebar, no terminal needed

### Debugging

- `.vscode/launch.json` has **Debug Jest Tests** and **Debug Current Test File**. Set a breakpoint in a test or in the source it exercises and press F5.
- To debug the running app itself, start the dev server (`pnpm start`) and press `j` in the terminal. This opens React Native DevTools, which supports breakpoints, network inspection, and console access against the Hermes engine.

### Snippets (`.vscode/rn.code-snippets`)

- `rnc` scaffolds a typed functional component (props type + `StyleSheet.create`)
- `rntest` scaffolds a React Native Testing Library test file for the current filename

## Interview cheatsheet

**Add a screen:** create a file under `src/app/`. `src/app/profile.tsx` becomes `/profile` on the root stack; `src/app/(tabs)/profile.tsx` becomes a tab, which also needs a `<Tabs.Screen>` entry in `src/app/(tabs)/_layout.tsx` for its title and icon.

**Navigate with params:**

```tsx
import { router, useLocalSearchParams } from 'expo-router';

router.push({ pathname: '/details/[id]', params: { id: '1', title: 'Example' } });

// on the receiving screen
const { id, title } = useLocalSearchParams<{ id: string; title?: string }>();
```

Typed routes check `pathname` values against the files in `src/app/` once the dev server has run.

**Fetch data:** nothing is pre-wired (no React Query/SWR). Use `useEffect` + `fetch`, or ask if the interviewer wants a data-fetching library added; it's one `pnpm add` away.

**State beyond one screen:** lift state into a layout, or reach for `useContext`. No global store is pre-installed on purpose, so you can make (and explain) that call live.

**Testing pattern used throughout:** React Native Testing Library 14 APIs are async.

```tsx
import { fireEvent, render, screen } from '@testing-library/react-native';

await render(<Thing />);
await fireEvent.press(screen.getByRole('button'));
expect(screen.getByText('...')).toBeTruthy();
```

For routes, render the real router tree and assert on the path:

```tsx
import { fireEvent, renderRouter, screen } from 'expo-router/testing-library';

await renderRouter('./src/app');
await fireEvent.press(screen.getByText('First item'));
expect(screen).toHavePathname('/details/1');
```

See `src/components/Button.test.tsx` (isolated component), `src/hooks/useCounter.test.ts` (hook via `renderHook`), and `src/__tests__/navigation.test.tsx` (full router tree) for three levels of test scope to copy from.

**Not building a counter/examples screen?** Delete `src/app/examples.tsx` and `src/__tests__/examples.test.tsx`, remove its `<Stack.Screen>` in `src/app/_layout.tsx`, and remove the button and its test in Home.

## Environment variables

Config lives in `app.config.js` (not `app.json`), so it can read `process.env`.
`APP_ENV=development` switches the app name and bundle/package id between dev
and prod builds.

Copy `.env.example` to `.env` and fill in real values. Anything prefixed
`EXPO_PUBLIC_` is loaded automatically by the Expo CLI and inlined into the JS
bundle at build time, so it is readable by anyone; never put secrets there.
Values without that prefix are only visible inside `app.config.js` itself (Node,
not the bundle). See the [Expo env vars guide](https://docs.expo.dev/guides/environment-variables/).

## CI

`.github/workflows/ci.yml` installs with the pinned pnpm and Node versions and
runs `pnpm run check` on every push and PR to `main`.

## Notes

- `@expo/vector-icons` is mocked out in tests (`jest.setup.tsx`); its async font loading otherwise spams `act()` warnings unrelated to anything you'll be testing.
- `ios/` and `android/` are not generated; this stays on the Expo managed workflow. Run `pnpm exec expo prebuild` only if a native module actually requires it.
- Linting uses Oxlint instead of `eslint-config-expo`. Oxlint covers the React, hooks, import, TypeScript and Jest rules natively, and `.oxlintrc.json` loads `eslint-plugin-expo` through `jsPlugins` for the Expo-specific rules (`EXPO_PUBLIC_` access, DOM component exports). `expo lint` assumes ESLint, so use `pnpm run lint` instead.
