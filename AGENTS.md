# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v58.0.0/ before writing any code.

Use pnpm and the Node version in `.node-version`. Add Expo packages with `pnpm exec expo install <package>` so versions match the SDK.

Routes live in `src/app/` (Expo Router). Keep tests outside `src/app/`: route tests use `renderRouter` from `expo-router/testing-library` in `src/__tests__/`, and component and hook tests sit next to their source. React Native Testing Library 14 APIs are async, so await `render`, `renderHook`, `fireEvent`, and `act`.

Run `pnpm run check` (typecheck, lint, format check, tests) before handing off.
