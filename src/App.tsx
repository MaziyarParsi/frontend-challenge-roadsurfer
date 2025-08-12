import { useState, useCallback } from "react";
import { Autocomplete } from "./components";
import { debounce } from "./utils/debounce";
import { fetchHandler } from "./utils/fetchHandler";

interface Station {
  id: string;
  name: string;
}

function App() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSuggestions = useCallback(
    debounce((...args: unknown[]) => {
      const searchTerm = String(args[0] ?? "");
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      fetchHandler<Station[]>(
        "https://605c94c36d85de00170da8b4.mockapi.io/stations"
      )
        .then((data) => {
          const filteredSuggestions = data.filter((station) =>
            station.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSuggestions(filteredSuggestions);
        })
        .catch((err) => {
          setError(err.message);
          setSuggestions([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    getSuggestions(e.target.value);
  };

  const handleSuggestionClick = (stationName: string) => {
    setValue(stationName);
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full bg-gray-950">
      <Autocomplete
        value={value}
        suggestions={suggestions}
        loading={loading}
        error={error}
        onChange={handleChange}
        onSuggestionClick={handleSuggestionClick}
      />
    </div>
  );
}

export default App;
