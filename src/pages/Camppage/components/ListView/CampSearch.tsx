import { useState, useEffect } from "react";

interface CampSearchComponentProps {
  onSearch: (query: string) => void;
}

const CampSearchComponent = ({ onSearch }: CampSearchComponentProps) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div className="mb-6 rounded-xl bg-white p-4 shadow-md border border-gray-200">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search camps by name or location..."
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default CampSearchComponent;
