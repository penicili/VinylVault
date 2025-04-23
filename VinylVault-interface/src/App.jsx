import { useState, useEffect } from "react";

function App() {
  const inventoryApi = "http://localhost:8081/api/inventory";
  const transactionApi = "http://localhost:8082/api/transactions";

  // Inventory State
  const [inventory, setInventory] = useState([]);
  // Transaction State
  const [transaction, setTransaction] = useState([]);

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

  // Add a function to get album title by ID
  const getAlbumTitleById = (albumId) => {
    if (!inventory || inventory.length === 0) return `Album #${albumId}`;
    // Find the album in inventory with matching ID
    const album = inventory.find(item => item.id.toString() === albumId.toString());
    // Return the title if found, otherwise return the ID
    return album ? album.title : `Album #${albumId}`;
  };

  useEffect(() => {
    getInventory();
    getTransactions();
  }, []);
  console.log(transaction);


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
            className="w-full h-[50px] px-4 py-2 border border-gray-300 rounded-3xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search albums by title"
          />
          {/* container tombol2 */}
          <div className="flex justify-between mb-4">
            <div className="flex gap-4"></div>
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

          {/* Transaction Section */}
          <div className="flex flex-col bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="bg-white p-4 border-b border-gray-300 mb-2">
              <h3 className="text-xl font-semibold">Active Transactions</h3>
            </div>

            <div className="flex flex-col gap-2">
              {transaction && transaction.length > 0 ? (
                transaction
                  .filter(item => item.is_returned === false || item.is_returned === true) // Show all transactions
                  .map((item) => (
                    <div 
                      key={item.transaction_id} 
                      className="flex justify-between items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
                    >
                      <p className="font-medium text-gray-800">id#{item.transaction_id}</p>
                      <p className="text-gray-600">
                        {/* ambil title pake album id */}
                        Title: {getAlbumTitleById(item.album_id)} | 
                        Date: {new Date(item.created_at).toLocaleDateString()}
                      </p>

                      {/* Conditional rendering based on is_returned status */}
                      {item.is_returned === false ? (
                        <button 
                          className="bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-green-500 transition duration-300 border border-gray-300 text-green-500 hover:text-white"
                          onClick={() => {
                            console.log(`Return album with transaction ID: ${item.transaction_id}`);
                            // TODO: Implement return functionality
                          }}
                        > 
                          Return
                        </button>
                      ) : (
                        <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-md">
                          Returned
                        </span>
                      )}
                    </div>
                  ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No active transactions
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
