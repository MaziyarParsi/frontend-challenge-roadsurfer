import { renderHook, act } from "@testing-library/react";
import useWeek from "../hooks/useWeek";

describe("useWeek", () => {
  it("should return the current week", () => {
    const { result } = renderHook(() => useWeek());
    expect(result.current.week).toHaveLength(7);
  });

  it("should go to the next week", () => {
    const { result } = renderHook(() => useWeek());
    const firstDayBefore = result.current.week[0].fullDate;
    act(() => {
      result.current.nextWeek();
    });
    const firstDayAfter = result.current.week[0].fullDate;
    expect(firstDayAfter.getDate()).toBe(firstDayBefore.getDate() + 7);
  });

  it("should go to the previous week", () => {
    const { result } = renderHook(() => useWeek());
    const firstDayBefore = result.current.week[0].fullDate;
    act(() => {
      result.current.prevWeek();
    });
    const firstDayAfter = result.current.week[0].fullDate;
    expect(firstDayAfter.getDate()).toBe(firstDayBefore.getDate() - 7);
  });
});
