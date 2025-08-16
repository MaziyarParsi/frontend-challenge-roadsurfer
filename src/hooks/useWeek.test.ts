import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import useWeek from "./useWeek";

describe("useWeek", () => {
  it("should return a week array with 7 days", () => {
    const { result } = renderHook(() => useWeek());
    expect(result.current.week).toHaveLength(7);
  });

  it("should have nextWeek and prevWeek functions", () => {
    const { result } = renderHook(() => useWeek());
    expect(typeof result.current.nextWeek).toBe("function");
    expect(typeof result.current.prevWeek).toBe("function");
  });

  it("should return day objects with expected properties", () => {
    const { result } = renderHook(() => useWeek());
    const firstDay = result.current.week[0];
    expect(firstDay).toHaveProperty("day");
    expect(firstDay).toHaveProperty("date");
    expect(firstDay).toHaveProperty("fullDate");
  });
});
