import React, { useState } from 'react';

const SearchSection = ({ 
  onShowAll, 
  onShowAvailable, 
  onSearch 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-6">
      {/* Search bar */}
      <input
        type="text"
        className="w-full h-[50px] px-4 py-2 border border-gray-300 rounded-3xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Search albums by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      
      {/* Container for buttons */}
      <div className="flex justify-between">
        <div className="flex gap-4"></div>
        <div className="flex justify-end gap-4">
          <button 
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition duration-300"
            onClick={onShowAll}
          >
            Show All
          </button>

          <button 
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition duration-300"
            onClick={onShowAvailable}
          >
            Show Available
          </button>

          <button 
            className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition duration-300"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;