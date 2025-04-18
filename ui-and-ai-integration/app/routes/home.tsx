import { useState, useEffect } from "react";
import { Link } from "react-router";
import AlbumCard from "~/components/albumcard";
import vinyls from "../../dummy-vinyls.json";

export function meta({}) {
  return [
    { title: "VinylVault - Home" },
    { name: "description", content: "Search and discover vinyl records" },
  ];
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setIsLoggedIn(true);
        setUser(parsedUser);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    // Check on component mount
    checkLoginStatus();

    // Set up storage event listener to handle login/logout in other tabs
    window.addEventListener('storage', checkLoginStatus);

    // Clean up
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset search results if query is empty
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    
    // Filter vinyls based on search query (case insensitive)
    const query = searchQuery.toLowerCase();
    const results = vinyls.filter(
      vinyl => 
        vinyl.title.toLowerCase().includes(query) ||
        vinyl.artist.toLowerCase().includes(query) ||
        vinyl.genre.toLowerCase().includes(query)
    );
    
    // Update state with search results
    setSearchResults(results);
    setHasSearched(true);
    
    console.log("Searching for:", searchQuery, "Found:", results.length, "results");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="container mx-auto px-4">
      {/* Search Section */}
      <div className="flex flex-col items-center justify-center py-8">
        <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded-lg p-8 shadow-2xl max-w-3xl w-full mb-8">
          <h1 className="text-4xl font-bold mb-4 text-center">VinylVault</h1>
          <p className="text-xl mb-6 text-center">Search for your favorite vinyl records</p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, artist, or genre..."
                className="bg-white flex-grow px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-900"
              />
              <button
                type="submit"
                className="bg-white text-indigo-800 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* User Section */}
        <div className="text-center py-4 mb-8">
          {isLoggedIn ? (
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Welcome, {user?.name || 'User'}!
              </p>
              <button
                onClick={handleLogout}
                className="inline-block bg-gray-600 text-white px-6 py-2 rounded-full font-bold hover:bg-gray-700 transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Already have an account?</p>
              <Link 
                to="/auth" 
                className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Search Results Section - Only shown after search */}
      {hasSearched && (
        <div className="py-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            {searchResults.length > 0 
              ? `Search Results (${searchResults.length})` 
              : "No vinyl records found matching your search"}
          </h2>
          
          {searchResults.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((vinyl) => (
                <AlbumCard
                  key={vinyl.id}
                  id={vinyl.id}
                  title={vinyl.title}
                  artist={vinyl.artist}
                  genre={vinyl.genre}
                  year={vinyl.year}
                  imageUrl={vinyl.imageUrl}
                  inStock={vinyl.inStock}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
