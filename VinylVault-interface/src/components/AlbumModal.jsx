import React from 'react';

const AlbumModal = ({ album, onClose, onRent }) => {
  const isAvailable = album?.available || album?.is_available;
  
  // Function to handle the rent button click
  const handleRent = () => {
    // Log the album ID for debugging
    console.log("Attempting to rent album with ID:", album.id);
    // Call the onRent function with the album ID
    onRent(album.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-xl w-full animate-fadeIn">
        {/* Header with close button */}
        <div className="bg-purple-800 text-white p-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Album Details</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Album content */}
        <div className="p-6">
          {/* Album details section */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Album cover */}
            <div className="flex-shrink-0">
              <img
                src={album?.cover_image || 'https://via.placeholder.com/200?text=No+Cover'} 
                alt={`${album?.title || 'Album'} cover`} 
                className="w-full md:w-48 h-48 object-cover rounded-md shadow-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200?text=Error+Loading+Image';
                }}
              />
            </div>
            
            {/* Album details */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{album?.title || 'Untitled Album'}</h2>
              <p className="text-xl text-gray-600 mb-3">{album?.artist || 'Unknown Artist'}</p>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-gray-600">
                  <span className="font-semibold">Release Year:</span> {album?.release_year || 'Unknown'}
                </div>
                <div className="text-gray-600">
                  <span className="font-semibold">Genre:</span> {album?.genre || 'Unknown'}
                </div>
                <div className="text-gray-600">
                  <span className="font-semibold">Label:</span> {album?.label || 'Unknown'}
                </div>
                <div className={`font-semibold ${isAvailable ? 'text-green-600' : 'text-red-500'}`}>
                  {isAvailable ? 'Available' : 'Currently Rented'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Description if available */}
          {album?.description && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Description</h4>
              <p className="text-gray-700">{album.description}</p>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
            
            {isAvailable && (
              <button 
                onClick={handleRent}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Rent Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumModal;