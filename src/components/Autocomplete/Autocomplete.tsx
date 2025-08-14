import { Input } from "../index";

// Types based on the API response
interface Station {
  id: string;
  name: string;
}

interface AutocompleteProps {
  value: string;
  suggestions: Station[];
  loading: boolean;
  error: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSuggestionClick: (stationName: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Autocomplete = ({
  value,
  suggestions,
  loading,
  error,
  onChange,
  onSuggestionClick,
  onFocus,
  onBlur,
}: AutocompleteProps) => {
  return (
    <div className="relative w-full">
      <Input
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Search for a station..."
      />

      {/* Loading indicator */}
      {loading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="absolute mt-2 w-full text-red-400 text-sm bg-red-900/20 border border-red-700 rounded-md p-2">
          <div className="flex items-center">{error}</div>
        </div>
      )}

      {/* Suggestions list */}
      {suggestions.length > 0 && (
        <ul className="absolute mt-2 w-full bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {suggestions.map((station, index) => (
            <li
              key={station.id}
              className={`p-3 hover:bg-gray-600 cursor-pointer transition-colors duration-150 ${
                index === 0 ? "rounded-t-lg" : ""
              } ${index === suggestions.length - 1 ? "rounded-b-lg" : ""}`}
              onClick={() => onSuggestionClick(station.name)}
            >
              <div className="flex items-center">
                <span className="text-gray-200 font-medium">
                  {station.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
