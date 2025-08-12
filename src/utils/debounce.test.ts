import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { debounce } from "./debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should call the function after the specified delay", () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 500);

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it("should reset the timer if called again before the delay has passed", () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 500);

    debouncedFunc();
    vi.advanceTimersByTime(250);
    debouncedFunc();

    vi.advanceTimersByTime(250);
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(250);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it("should pass arguments to the original function", () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 500);
    const args = [1, "test", { a: 1 }];

    debouncedFunc(...args);
    vi.advanceTimersByTime(500);

    expect(func).toHaveBeenCalledWith(...args);
  });
});
