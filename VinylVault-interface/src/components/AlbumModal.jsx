import React from 'react';

const AlbumModal = ({ album, onClose, onRent }) => {
  if (!album) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
        {/* Only close button */}
        <button 
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-3xl z-10 w-8 h-8 flex items-center justify-center" 
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <div className="p-6 md:flex">
          <div className="md:w-2/5 mb-6 md:mb-0">
            <img 
              src={album.cover_image || 'https://via.placeholder.com/300?text=No+Cover'} 
              alt={`${album.title} cover`} 
              className="w-full rounded-lg shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300?text=Error+Loading+Image';
              }}
            />
          </div>
          <div className="md:w-3/5 md:pl-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{album.title}</h2>
            <p className="text-gray-700 text-lg mb-2">Artist: {album.artist}</p>
            <p className="text-gray-700 mb-2">Year: {album.release_year}</p>
            <p className="text-gray-700 mb-2">Genre: {album.genre || 'Not specified'}</p>
            <p className="text-gray-700 mb-2">Label: {album.label || 'Not specified'}</p>
            <p className="text-gray-700 mb-2">Condition: {album.condition || 'Not specified'}</p>
            
            {album.description && (
              <p className="text-gray-700 mb-4">
                <span className="font-medium">Description:</span><br/>
                {album.description}
              </p>
            )}
            
            <p className={`text-lg font-medium mb-6 ${(album.available || album.is_available) ? 'text-green-600' : 'text-red-500'}`}>
              Status: {(album.available || album.is_available) ? 'Available' : 'Currently Rented'}
            </p>
            
            {(album.available || album.is_available) && (
              <button 
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={() => onRent(album.id)}
              >
                Rent This Album
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumModal;