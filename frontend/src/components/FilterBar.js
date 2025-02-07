import React from 'react';

const FilterBar = ({
  onFilterChange,
  onSortChange,
  activeFilter,
  activeSort,
}) => {
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'politics', label: 'Politics' },
    { id: 'economy', label: 'Economy' },
    { id: 'climate', label: 'Climate' },
    { id: 'diplomacy', label: 'Diplomacy' },
    { id: 'security', label: 'Security' },
  ];

  const sortOptions = [
    { id: 'latest', label: 'Latest' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'discussed', label: 'Most Discussed' },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg mb-6 sticky top-16 z-40">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onFilterChange(category.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onSortChange(option.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeSort === option.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
