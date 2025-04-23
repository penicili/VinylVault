import React, { useState, useEffect } from "react";
import { getRecommendations } from "../services/recommendationService";
import AlbumCard from "./AlbumCard"; // Import AlbumCard dulu ya

const Assistant = ({ onClose }) => {
  const [preferences, setPreferences] = useState({
    mood: [],
    era: [],
    genre: [],
    occasion: [],
  });
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  // Ambil semua album waktu komponen pertama kali muncul
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8081/api/inventory");
        
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        
        const jsonResponse = await response.json();
        
        // Data albumnya ada di dalam property 'data'
        const albumData = jsonResponse.data || [];
        
        setAlbums(albumData); // Simpan data album lengkap
      } catch (error) {
        console.error("Error fetching albums:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const handlePreferenceChange = (category, value) => {
    setPreferences(prev => {
      // Kalau sudah ada, hapus dari list
      if (prev[category].includes(value)) {
        return {
          ...prev,
          [category]: prev[category].filter(item => item !== value)
        };
      } 
      // Kalau belum ada, tambahkan ke list
      return {
        ...prev,
        [category]: [...prev[category], value]
      };
    });
  };

  const handleGetRecommendations = async () => {
    try {
      setIsLoading(true);
      setShowRecommendations(true);
      
      const results = await getRecommendations(preferences, albums);
      setRecommendations(results);
    } catch (error) {
      console.error("Error getting recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderRecommendations = () => {
    if (isLoading) {
      return (
        <div className="mt-4 p-4 bg-purple-50 rounded-lg text-center">
          <p>Generating recommendations...</p>
        </div>
      );
    }
    
    if (!recommendations || recommendations.length === 0) {
      return (
        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
          <p>No recommendations found. Try adjusting your preferences.</p>
        </div>
      );
    }
    
    return (
      <div className="mt-4 p-4 bg-purple-50 rounded-lg">
        <h3 className="font-bold text-purple-800 mb-4">Based on your preferences, we recommend:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map(album => (
            <div key={album.id} className="recommendation-item">
              <AlbumCard album={album} />
              <p className="mt-2 p-3 bg-white rounded-lg text-sm text-gray-700 italic">
                "{album.reason}"
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCheckboxGroup = (category, options, title) => {
    return (
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-2 text-purple-700">{title}</h3>
        <div className="grid grid-cols-2 gap-2">
          {options.map(option => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences[category].includes(option)}
                onChange={() => handlePreferenceChange(category, option)}
                className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg py-6 px-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-purple-800 text-2xl font-bold">
            VinylVault AI Assistant
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700">Select your preferences to get album recommendations:</p>
        </div>
        
        {isLoading && !showRecommendations ? (
          <div className="text-center py-4">
            <p>Loading album data...</p>
          </div>
        ) : (
          <form className="space-y-4">
            {renderCheckboxGroup("mood", ["Energetic", "Relaxed", "Happy", "Melancholic", "Intense", "Peaceful"], "What mood are you in?")}
            
            {renderCheckboxGroup("era", ["1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"], "Which era of music do you prefer?")}
            
            {renderCheckboxGroup("genre", ["Rock", "Jazz", "Classical", "Hip-Hop", "Electronic", "Folk", "R&B", "Metal"], "What genres do you enjoy?")}
            
            {renderCheckboxGroup("occasion", ["Party", "Study/Work", "Road Trip", "Relaxation", "Workout", "Dinner"], "What's the occasion?")}
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleGetRecommendations}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300"
                disabled={isLoading}
              >
                Get Recommendations
              </button>
            </div>
            
            {showRecommendations && renderRecommendations()}
          </form>
        )}
      </div>
    </div>
  );
};

export default Assistant;
