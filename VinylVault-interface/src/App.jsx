import { useState, useEffect } from "react";
import AlbumList from "./components/AlbumList"; // Update import
import TransactionList from "./components/TransactionList";
import SearchSection from "./components/SearchSection";
import AlbumModal from './components/AlbumModal'; // Add import
import Assistant from './components/Assistant'; 

function App() {
  const inventoryApi = "http://localhost:8081/api/inventory";
  const transactionApi = "http://localhost:8082/api/transactions";

  // State buat inventory
  const [inventory, setInventory] = useState([]);
  // State buat transaksi
  const [transaction, setTransaction] = useState([]);
  // State buat tampilan daftar album
  const [showAlbums, setShowAlbums] = useState(false);
  // State buat album yang dipilih
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  // State buat tampilan assistant
  const [showAssistant, setShowAssistant] = useState(false);

  // Ambil semua data inventory
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

  // Ambil inventory berdasarkan keyword pencarian
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

  // Ambil inventory yang masih tersedia saja
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

  // Ambil semua data transaksi
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

  // Update status album yang dikembalikan
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
      
      // Coba parse JSON kalau ada isinya
      let responseData;
      if (responseText && responseText.trim()) {
        try {
          responseData = JSON.parse(responseText);
          console.log("Parsed JSON response:", responseData);
        } catch (parseError) {
          console.error("Cannot parse response as JSON:", parseError);
        }
      }
      
      // Penting: Update inventory dulu biar judul album tersedia
      await getInventory();
      console.log("Inventory refreshed after return");
      
      // Baru update transaksi
      await getTransactions();
      console.log("Transactions refreshed after return");
      
    } catch (error) {
      console.error("Error returning album:", error);
    }
  };

  // function buat dapet judul album dari ID
  const getAlbumTitleById = (albumId) => {
    if (!inventory || inventory.length === 0) return `Album #${albumId}`;
    // Cari album di inventory dengan ID yang sama
    const album = inventory.find(item => item.id.toString() === albumId.toString());
    // Kembalikan judul kalau ketemu, kalau nggak kembalikan ID-nya
    return album ? album.title : `Album #${albumId}`;
  };

  // Sewa album baru
  const rentAlbum = async (albumId) => {
    try {
      console.log("Starting rental process for album ID:", albumId);
      
      // Pastikan albumId dikirim dengan benar
      const requestBody = { album_id: albumId.toString() };
      console.log("Request body:", JSON.stringify(requestBody));
      
      const response = await fetch(transactionApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      // Cek status response
      console.log("Response status:", response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      
      // Tangani response sederhana
      const responseText = await response.text();
      console.log("Raw server response:", responseText);
      
      // Coba parse kalau ada isinya
      let responseData;
      if (responseText) {
        try {
          responseData = JSON.parse(responseText);
          console.log("Parsed JSON response:", responseData);
        } catch (parseError) {
          console.error("Cannot parse response as JSON:", parseError);
        }
      }
      
      // Update inventory dulu
      await getInventory();
      // Lalu update transaksi
      await getTransactions();
      
      // Tutup modal
      setSelectedAlbum(null);
    } catch (error) {
      console.error("Error renting album:", error);
    }
  };

  // function-function handler buat komponen SearchSection
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

  // Handler buat klik album - sekarang set album yang dipilih
  const handleAlbumClick = (album) => {
    console.log("Album clicked:", album);
    setSelectedAlbum(album);
  };

  // Handler buat menampilkan asisten
  const handleShowAssistant = () => {
    setShowAssistant(true);
    console.log("Show AI Assistant");
  };

  useEffect(() => {
    getInventory();
    getTransactions();
  }, []);
  console.log(inventory);

  return (
    // Container utama
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8">
      <div className="text-center mb-8">
        {/* Judul */}
        <h1 className="text-7xl font-bold text-purple-800 mb-1">VinylVault</h1>
        {/* Subjudul */}
        <h2 className="text-2xl font-semibold text-gray-500 mb-4">
          Simple vinyl rental service
        </h2>
      </div>

      {/* Komponen SearchSection */}
      <SearchSection
        onShowAll={handleShowAll}
        onShowAvailable={handleShowAvailable}
        onSearch={handleSearch}
        onShowAssistant={handleShowAssistant}
      />

      {/* Container konten utama */}
      <div className="w-full max-w-4xl">
        {/* Komponen TransactionList */}
        <TransactionList 
          transactions={transaction}
          onReturn={returnAlbum}
          getAlbumTitle={getAlbumTitleById}
        />

        {/* Komponen AlbumList */}
        {showAlbums && (
          <AlbumList 
            albums={inventory}
            onAlbumClick={handleAlbumClick}
          />
        )}
      </div>

      {/* Tambahkan modal di akhir komponen */}
      {selectedAlbum && (
        <AlbumModal 
          album={selectedAlbum} 
          onClose={() => setSelectedAlbum(null)} 
          onRent={rentAlbum}
        />
      )}
      
      {/* Komponen Assistant */}
      {showAssistant && (
        <Assistant 
          onClose={() => setShowAssistant(false)} 
        />
      )}
    </div>
  );
}

export default App;
