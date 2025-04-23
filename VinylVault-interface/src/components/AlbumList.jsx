import React, { useState } from 'react';
import AlbumCard from './AlbumCard';

const AlbumList = ({ albums, onAlbumClick }) => {
  const [contentVisible, setContentVisible] = useState(true);
  
  // Get the album count
  const albumCount = albums?.length || 0;

  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="bg-white p-4 border-b border-gray-300 mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Albums</h3>
          <p className="text-sm text-gray-500 mt-1">Showing {albumCount} albums</p>
        </div>
        <button 
          className="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200 transition-colors flex items-center"
          onClick={() => setContentVisible(!contentVisible)}
        >
          {contentVisible ? (
            <>
              <span className="mr-1">Hide</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </>
          ) : (
            <>
              <span className="mr-1">Show</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>
      
      {/* Album cards grid with transition */}
      <div 
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4
          transition-all duration-300 ease-in-out
          ${contentVisible 
            ? 'opacity-100 max-h-[5000px]' 
            : 'opacity-0 max-h-0 overflow-hidden'
          }`}
      >
        {albums && albums.length > 0 ? (
          albums.map((album) => (
            <AlbumCard 
              key={album.id} 
              album={album} 
              onClick={onAlbumClick}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No albums available
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumList;