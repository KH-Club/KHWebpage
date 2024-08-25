

interface CampSearchProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const CampSearch = ({ searchTerm, setSearchTerm }: CampSearchProps) => {
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="mb-6 flex justify-center">
            <input
                type="text"
                placeholder="Search camps..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full max-w-8xl p-2 border border-gray-300 rounded-lg"
            />
        </div>
    );
};

export default CampSearch;
