import { useState, useEffect } from "react";

function App() {
  const inventoryApi = "http://localhost:8081/api/inventory";
  const transactionApi = "http://localhost:8082/api/transaction";

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
      const data = await response.json();
      setInventory(data);
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
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };


  // GET inventory by avilability
  const getInventoryByAvailability = async () => {
    try {
      const response = await fetch(`${inventoryApi}/available`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };
  


  // GET all transaction
  const getTransaction = async () => {
    try {
      const response = await fetch(transactionApi);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTransaction(data);
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  };
  getTransaction();
  
  
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

          <div className="grid grid-rows-2 bg-white shadow-md rounded lg p-4 mb-4">
            <div className="bg-white p-4 border-b border-gray-300">
              <h3>Active Transactions</h3>
            </div>

            <div className="flex flex-col gap-2">
              {/* for each transaction */}
              <div className="flex justify-between items-center p-4 rounded-lg">
                <p>Transaction Id placeholder</p>
                <p>Transaction Details placeholder</p>
                <button className="bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-green-500 transition duration-300 border border-gray-300 text-green-500 hover:text-white"> 
                  Return
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
