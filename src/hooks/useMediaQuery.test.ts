import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import useMediaQuery from "./useMediaQuery";

describe("useMediaQuery", () => {
  it("should return a boolean value", () => {
    const { result } = renderHook(() => useMediaQuery("(min-width: 1024px)"));
    expect(typeof result.current).toBe("boolean");
  });

  it("should handle different media queries", () => {
    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(typeof result.current).toBe("boolean");
  });
});
