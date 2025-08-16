import { describe, it, expect } from "vitest";
import { debounce } from "./debounce";

describe("debounce", () => {
  it("should return a function", () => {
    const func = () => {};
    const debouncedFunc = debounce(func, 500);
    expect(typeof debouncedFunc).toBe("function");
  });

  it("should accept a function and delay as parameters", () => {
    const func = () => {};
    const delay = 500;
    const debouncedFunc = debounce(func, delay);
    expect(debouncedFunc).toBeDefined();
  });

  it("should handle different delay values", () => {
    const func = () => {};
    const debouncedFunc1 = debounce(func, 100);
    const debouncedFunc2 = debounce(func, 1000);
    expect(typeof debouncedFunc1).toBe("function");
    expect(typeof debouncedFunc2).toBe("function");
  });
});
