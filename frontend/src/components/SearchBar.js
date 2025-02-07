import React from 'react';

const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search international relations news..."
          className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700/50 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm backdrop-blur-sm placeholder-gray-400"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 shadow-sm backdrop-blur-sm"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
