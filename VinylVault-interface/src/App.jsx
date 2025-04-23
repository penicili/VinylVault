import { useState, useEffect } from "react";
import AlbumList from "./components/AlbumList"; // Update import
import TransactionList from "./components/TransactionList";
import SearchSection from "./components/SearchSection";
import AlbumModal from './components/AlbumModal'; // Add import

function App() {
  const inventoryApi = "http://localhost:8081/api/inventory";
  const transactionApi = "http://localhost:8082/api/transactions";

  // Inventory State
  const [inventory, setInventory] = useState([]);
  // Transaction State
  const [transaction, setTransaction] = useState([]);
  // Add a new state for visibility
  const [showAlbums, setShowAlbums] = useState(false);
  // Add this state for the selected album
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  // Add a new state for notifications
  const [notification, setNotification] = useState(null);

  // GET all inventory
  const getInventory = async () => {
    try {
      const response = await fetch(inventoryApi);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseJson = await response.json();
      const inventoryData = responseJson.data || [];
      setInventory(inventoryData);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  // GET inventory by query
  const getInventoryByQuery = async (query) => {
    try {
      const response = await fetch(`${inventoryApi}/search/${query}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseJson = await response.json();
      const inventoryData = responseJson.data || [];
      setInventory(inventoryData);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  // GET inventory by availability
  const getInventoryByAvailability = async () => {
    try {
      const response = await fetch(`${inventoryApi}/available`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseJson = await response.json();
      const inventoryData = responseJson.data || [];
      setInventory(inventoryData);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  // GET all transaction
  const getTransactions = async () => {
    try {
      const response = await fetch(transactionApi);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseJson = await response.json();
      
      const transactionData = responseJson.data || [];
      
      console.log("Transactions received:", transactionData);
      setTransaction(transactionData);
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  };

  // PATCH return rented album
  const returnAlbum = async (transactionId) => {
    try {
      console.log("Returning album with transaction ID:", transactionId);
      
      const response = await fetch(`${transactionApi}/${transactionId}/return`, {
        method: "PATCH",
      });
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const responseText = await response.text();
      console.log("Raw server response:", responseText);
      
      // Only try to parse if there's content
      let responseData;
      if (responseText && responseText.trim()) {
        try {
          responseData = JSON.parse(responseText);
          console.log("Parsed JSON response:", responseData);
        } catch (parseError) {
          console.error("Cannot parse response as JSON:", parseError);
        }
      }
      
      // Important: First update inventory to make sure album titles are available
      await getInventory();
      console.log("Inventory refreshed after return");
      
      // Then update transactions
      await getTransactions();
      console.log("Transactions refreshed after return");
      
    } catch (error) {
      console.error("Error returning album:", error);
    }
  };

  // Add a function to get album title by ID
  const getAlbumTitleById = (albumId) => {
    if (!inventory || inventory.length === 0) return `Album #${albumId}`;
    // Find the album in inventory with matching ID
    const album = inventory.find(item => item.id.toString() === albumId.toString());
    // Return the title if found, otherwise return the ID
    return album ? album.title : `Album #${albumId}`;
  };

  // POST rent album
  const rentAlbum = async (albumId) => {
    try {
      console.log("Starting rental process for album ID:", albumId);
      
      // Make sure the albumId is passed correctly
      const requestBody = { album_id: albumId.toString() };
      console.log("Request body:", JSON.stringify(requestBody));
      
      const response = await fetch(transactionApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      // Log the response status
      console.log("Response status:", response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      
      // Simple response handling
      const responseText = await response.text();
      console.log("Raw server response:", responseText);
      
      // Only try to parse if there's content
      let responseData;
      if (responseText) {
        try {
          responseData = JSON.parse(responseText);
          console.log("Parsed JSON response:", responseData);
        } catch (parseError) {
          console.error("Cannot parse response as JSON:", parseError);
        }
      }
      
      // First update inventory
      await getInventory();
      // Then update transactions
      await getTransactions();
      
      // Close the modal
      setSelectedAlbum(null);
    } catch (error) {
      console.error("Error renting album:", error);
    }
  };

  // Handler functions for the SearchSection component
  const handleShowAll = () => {
    getInventory();
    setShowAlbums(true);
  };

  const handleShowAvailable = () => {
    getInventoryByAvailability();
    setShowAlbums(true);
  };

  const handleSearch = (query) => {
    getInventoryByQuery(query);
    setShowAlbums(true);
  };

  // Updated handler for album click - now it sets the selected album
  const handleAlbumClick = (album) => {
    console.log("Album clicked:", album);
    setSelectedAlbum(album);
  };

  useEffect(() => {
    getInventory();
    getTransactions();
  }, []);
  console.log(inventory);

  return (
    // Main container
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8">
      <div className="text-center mb-8">
        {/* Title */}
        <h1 className="text-7xl font-bold text-purple-800 mb-1">VinylVault</h1>
        {/* Subtitle */}
        <h2 className="text-2xl font-semibold text-gray-500 mb-4">
          Simple vinyl rental service
        </h2>
      </div>

      {/* SearchSection component */}
      <SearchSection
        onShowAll={handleShowAll}
        onShowAvailable={handleShowAvailable}
        onSearch={handleSearch}
      />

      {/* Main content container */}
      <div className="w-full max-w-4xl">
        {/* TransactionList component */}
        <TransactionList 
          transactions={transaction}
          onReturn={returnAlbum}
          getAlbumTitle={getAlbumTitleById}
        />

        {/* AlbumList component */}
        {showAlbums && (
          <AlbumList 
            albums={inventory}
            onAlbumClick={handleAlbumClick}
          />
        )}
      </div>

      {/* Add the modal at the end of the component */}
      {selectedAlbum && (
        <AlbumModal 
          album={selectedAlbum} 
          onClose={() => setSelectedAlbum(null)} 
          onRent={rentAlbum}
        />
      )}
    </div>
  );
}

export default App;
