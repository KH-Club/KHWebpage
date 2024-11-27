import { useState } from "react";

interface CampSearchComponentProps {
    onSearch: (query: string, filterBy: string) => void;
}

const CampSearchComponent = ({ onSearch }: CampSearchComponentProps) => {
    const [query, setQuery] = useState("");
    const [filterBy, setFilterBy] = useState("name");

    const handleSearch = () => {
        onSearch(query, filterBy);
    };

    return (
        <div className="mb-6 p-4 bg-white shadow-md rounded-lg flex flex-col md:flex-row items-center gap-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search camps..."
                className="w-full md:w-4/5 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full md:w-1/5 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="name">Filter by Camp Name</option>
                <option value="location">Filter by Camp Location</option>
            </select>
            <button
                onClick={handleSearch}
                className="mt-2 md:mt-0 bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
                Search
            </button>
        </div>
    );
};

export default CampSearchComponent;
