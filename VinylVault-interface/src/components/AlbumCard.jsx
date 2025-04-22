import React from 'react';

const AlbumCard = ({ album, onClick }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer ${!(album?.available || album?.is_available) ? 'opacity-70' : ''}`}
      onClick={() => onClick(album)}
    >
      <img
        src={album?.cover_image || 'https://via.placeholder.com/150?text=No+Cover'} 
        alt={`${album?.title || 'Album'} cover`} 
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/150?text=Error+Loading+Image';
        }}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{album?.title || 'Untitled Album'}</h3>
        <p className="text-gray-600 mb-1">{album?.artist || 'Unknown Artist'}</p>
        <p className="text-gray-500 text-sm mb-2">{album?.release_year || 'Unknown Year'}</p>
        <p className={`font-medium ${(album?.available || album?.is_available) ? 'text-green-600' : 'text-red-500'}`}>
          {(album?.available || album?.is_available) ? 'Available' : 'Currently Rented'}
        </p>
      </div>
    </div>
  );
};

export default AlbumCard;