import { render, screen } from "@testing-library/react";
import WeekView from "./WeekView";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("WeekView", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-15"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const mockStation = {
    id: "1",
    name: "Station 1",
    bookings: [
      {
        id: "b1",
        startDate: "2024-01-01T10:00:00.000Z",
        endDate: "2024-01-01T12:00:00.000Z",
        pickupReturnStationId: "1",
      },
    ],
  };

  const mockStations = [mockStation];

  it("renders the component with station name", () => {
    render(<WeekView selectedStation={mockStation} stations={mockStations} />);
    expect(screen.getByText(/january/i)).toBeInTheDocument();
  });

  it("renders the correct number of day tiles", () => {
    render(<WeekView selectedStation={mockStation} stations={mockStations} />);
    const dayTiles = screen.getAllByText(/mon|tue|wed|thu|fri|sat|sun/i);
    expect(dayTiles.length).toBe(7);
  });

  it("should render the component without errors", () => {
    const { container } = render(
      <WeekView selectedStation={mockStation} stations={mockStations} />
    );
    expect(container).toBeInTheDocument();
  });

  it("displays the correct month and year", () => {
    render(<WeekView selectedStation={mockStation} stations={mockStations} />);
    const currentMonthAndYear = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    expect(screen.getByText(currentMonthAndYear)).toBeInTheDocument();
  });
});
