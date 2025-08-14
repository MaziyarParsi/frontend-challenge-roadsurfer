import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStations } from "./services/api";
import { Autocomplete } from "./components";
import WeekView from "./components/Calendar/WeekView";
interface Station {
  id: string;
  name: string;
  bookings: Array<{
    id: string;
    startDate: string;
    endDate: string;
    pickupReturnStationId: string;
  }>;
}

function App() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const {
    data: stations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stations"],
    queryFn: getStations,
    retry: 1,
  });

  const filteredSuggestions = useMemo(() => {
    if (!inputValue || !showSuggestions) return [];
    return stations.filter((station: Station) =>
      station.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [stations, inputValue, showSuggestions]);

  const handleSuggestionClick = (stationName: string) => {
    const station = stations.find((s: Station) => s.name === stationName);
    if (station) {
      setSelectedStation(station);
      setInputValue(station.name);
      setShowSuggestions(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(true);

    if (selectedStation && value !== selectedStation.name) {
      setSelectedStation(null);
    }
  };

  const handleInputFocus = () => {
    if (inputValue) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Bookings Calendar
            </h1>
            <p className="text-gray-300">
              Select a station to view and manage bookings
            </p>
          </div>

          {/* Station Selector */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-700">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Station
            </label>
            <Autocomplete
              suggestions={filteredSuggestions}
              onSuggestionClick={handleSuggestionClick}
              value={inputValue}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              loading={isLoading}
              error={error as string | null}
            />
            {error && (
              <p className="text-red-400 text-sm mt-2">
                Error loading stations. Please try again.
              </p>
            )}
          </div>

          {/* Calendar View - Always render to prevent layout shift */}
          <div className="mb-8">
            {selectedStation ? (
              <>
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-4 border border-gray-700">
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Station: {selectedStation.name}
                  </h2>
                  <p className="text-gray-300">
                    Total Bookings: {selectedStation.bookings?.length || 0}
                  </p>
                </div>
                <WeekView
                  selectedStation={selectedStation}
                  onBookingClick={() => {}}
                />
              </>
            ) : (
              <div className="bg-gray-800 rounded-lg shadow-lg p-12 border border-gray-700">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-300 mb-2">
                    No Station Selected
                  </h3>
                  <p className="text-gray-500">
                    Select a station above to view the calendar
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
