import React from 'react';
import AlbumCard from './AlbumCard';

const AlbumGrid = ({ albums, onAlbumSelect }) => {
  if (!Array.isArray(albums)) {
    return (
      <div className="col-span-full text-center py-8">
        <p className="text-red-500">Error: Unable to display albums (invalid data format)</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {albums.map(album => (
        <AlbumCard 
          key={album?.id || Math.random()} 
          album={album} 
          onClick={onAlbumSelect}
        />
      ))}
    </div>
  );
};

export default AlbumGrid;