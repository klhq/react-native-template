import { act, renderHook } from '@testing-library/react-native';

import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('starts at the given initial value', () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.count).toBe(5);
  });

  it('increments and decrements', () => {
    const { result } = renderHook(() => useCounter());

    act(() => result.current.increment());
    act(() => result.current.increment());
    act(() => result.current.decrement());

    expect(result.current.count).toBe(1);
  });

  it('resets to the initial value', () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => result.current.increment());
    act(() => result.current.reset());

    expect(result.current.count).toBe(10);
  });
});
