import { useState, useEffect } from "react";

function App() {
  return (
    // Main container
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      {/* container tulisan */}
      <div className="text-center">
        {/* Judul */}
        <h1 className="text-7xl font-bold text-purple-800 mb-1">VinylVault</h1>
        {/* subtitle */}
        <h2 className="text-2xl font-semibold text-gray-500 mb-4">
          Simple vinyl rental service
        </h2>

        {/* Container komponen-komponen */}
        <div className="max-w-3xl w-[700px]">
          {/* Search bar */}
          <input
            type="text"
            className="w-full h-[50px] px-4 py-2 border border-gray-300 rounded-3xl mb-4"
            placeholder="Search albums by title"
          />
          {/* container tombol2 */}
          <div className="flex justify-between mb-4">
            <div className="flex gap-4">

            </div>
            <div className="flex justify-end mb-4 gap-4">
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition duration-300">
                Show All
              </button>

              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition duration-300">
                Show Available
              </button>

              <button className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition duration-300">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
