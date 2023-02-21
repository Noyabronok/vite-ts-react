import {renderHook} from "../../test-utils";
import { describe, it, expect } from "vitest";
import { useMockMode } from "./useMockMode";
import { act } from "react-dom/test-utils";

describe('useMockMode',() => {
  it('should default to false', () => {
    const {mockMode} = renderHook(() => useMockMode()).result.current;
    expect(mockMode).toBe(false);
  });

  it('should toggle', () => {
    const  { result } = renderHook(() => useMockMode());
    expect(result.current.mockMode).toBe(false);
    act(() => result.current.onMockModeToggle())
    expect(result.current.mockMode).toBe(true);
    act(() => result.current.onMockModeToggle())
    expect(result.current.mockMode).toBe(false);
  })
});