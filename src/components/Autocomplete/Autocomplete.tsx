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
}

const Autocomplete = ({
  value,
  suggestions,
  loading,
  error,
  onChange,
  onSuggestionClick,
}: AutocompleteProps) => {
  return (
    <div className="relative w-full md:w-92">
      <Input
        value={value}
        onChange={onChange}
        placeholder="Search for a station..."
      />
      {loading && (
        <div className="absolute mt-1 w-full text-white">Loading...</div>
      )}
      {error && (
        <div className="absolute mt-1 w-full text-red-500">{error}</div>
      )}
      {suggestions.length > 0 && (
        <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md z-10">
          {suggestions.map((station) => (
            <li
              key={station.id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => onSuggestionClick(station.name)}
            >
              {station.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
