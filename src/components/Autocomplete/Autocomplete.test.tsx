import { render, screen, fireEvent } from "@testing-library/react";
import Autocomplete from "./Autocomplete";
import { describe, it, expect, vi } from "vitest";

describe("Autocomplete", () => {
  const mockSuggestions = [
    { id: "1", name: "Station 1" },
    { id: "2", name: "Station 2" },
  ];

  it("renders the input field", () => {
    render(
      <Autocomplete
        value=""
        suggestions={[]}
        loading={false}
        error={null}
        onChange={() => {}}
        onSuggestionClick={() => {}}
      />
    );
    expect(
      screen.getByPlaceholderText("Search for a station...")
    ).toBeInTheDocument();
  });

  it("displays suggestions when provided", () => {
    render(
      <Autocomplete
        value="Sta"
        suggestions={mockSuggestions}
        loading={false}
        error={null}
        onChange={() => {}}
        onSuggestionClick={() => {}}
      />
    );
    expect(screen.getByText("Station 1")).toBeInTheDocument();
    expect(screen.getByText("Station 2")).toBeInTheDocument();
  });

  it("calls onSuggestionClick when a suggestion is clicked", () => {
    const handleSuggestionClick = vi.fn();
    render(
      <Autocomplete
        value="Sta"
        suggestions={mockSuggestions}
        loading={false}
        error={null}
        onChange={() => {}}
        onSuggestionClick={handleSuggestionClick}
      />
    );
    fireEvent.click(screen.getByText("Station 1"));
    expect(handleSuggestionClick).toHaveBeenCalledWith("Station 1");
  });

  it("displays a loading indicator when loading", () => {
    const { container } = render(
      <Autocomplete
        value=""
        suggestions={[]}
        loading={true}
        error={null}
        onChange={() => {}}
        onSuggestionClick={() => {}}
      />
    );
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("displays an error message when an error is present", () => {
    render(
      <Autocomplete
        value=""
        suggestions={[]}
        loading={false}
        error="Test error"
        onChange={() => {}}
        onSuggestionClick={() => {}}
      />
    );
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });
});
