import { act, renderHook } from '@testing-library/react-native';

import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('starts at the given initial value', async () => {
    const { result } = await renderHook(() => useCounter(5));

    expect(result.current.count).toBe(5);
  });

  it('increments and decrements', async () => {
    const { result } = await renderHook(() => useCounter());

    await act(() => result.current.increment());
    await act(() => result.current.increment());
    await act(() => result.current.decrement());

    expect(result.current.count).toBe(1);
  });

  it('resets to the initial value', async () => {
    const { result } = await renderHook(() => useCounter(10));

    await act(() => result.current.increment());
    await act(() => result.current.reset());

    expect(result.current.count).toBe(10);
  });
});
