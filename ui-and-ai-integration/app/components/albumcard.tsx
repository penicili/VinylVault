import React from 'react';
import { Link } from "react-router";

type AlbumCardProps = {
  id: string;
  title: string;
  artist: string;
  genre: string;
  year: number;
  imageUrl: string;
  inStock: number;
};

export default function AlbumCard({ id, title, artist, genre, year, imageUrl, inStock }: AlbumCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-square bg-gray-200 dark:bg-gray-700">
        <img
          src={imageUrl}
          alt={`${title} by ${artist}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.src = "https://via.placeholder.com/300x300?text=Album+Art";
          }}
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">{artist}</p>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">{year}</span>
          <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
            {genre}
          </span>
        </div>
        
        {/* Stock Status */}
        <div className="flex items-center mb-3">
          <span className="text-sm mr-1">In Stock:</span>
          <span className={`text-sm font-medium ${inStock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {inStock > 0 ? `${inStock} copies` : 'Out of stock'}
          </span>
        </div>
        
        <div className="mt-4">
          <button 
            className={`w-full py-2 rounded font-medium transition-colors duration-300 ${
              inStock > 0 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer' 
                : 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
            }`}
            disabled={inStock === 0}
            onClick={() => {
              if (inStock > 0) {
                console.log(`Rental request for album: ${title}`);
                // Later this would trigger a rental modal or navigate to a rental page
              }
            }}
          >
            {inStock > 0 ? 'Rent Album' : 'Currently Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
}