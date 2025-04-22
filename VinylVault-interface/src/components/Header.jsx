import React from 'react';

const Header = ({ searchQuery, handleSearchChange }) => {
  return (
    <header className="py-8 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-indigo-600">VinylVault</h1>
        <p className="text-lg text-center text-gray-600 mt-2 mb-8">Your simple vinyl rental service</p>
        <div className="max-w-xl mx-auto">
          <input
            type="text"
            className="w-full px-4 py-3 rounded-full border-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="Search albums by title or artist..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;