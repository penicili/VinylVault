// API service to abstract the API calls

// Base URLs for the APIs
const INVENTORY_API_URL = 'http://localhost:8081/api/inventory';
const TRANSACTION_API_URL = 'http://localhost:8082/api/transactions';

// Fetch all albums
export const fetchAlbums = async () => {
  const response = await fetch(INVENTORY_API_URL);
  
  if (!response.ok) {
    throw new Error('Failed to fetch albums');
  }
  
  return await response.json();
};

// Search albums
export const searchAlbums = async (query) => {
  const response = await fetch(`${INVENTORY_API_URL}/search/${query}`);
  
  if (!response.ok) {
    throw new Error('Search failed');
  }
  
  return await response.json();
};

// Get album details
export const getAlbumDetails = async (albumId) => {
  const response = await fetch(`${INVENTORY_API_URL}/${albumId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch album details');
  }
  
  return await response.json();
};

// Check album availability
export const checkAlbumStatus = async (albumId) => {
  const response = await fetch(`http://localhost:8082/check-album-status?album_id=${albumId}`);
  
  if (!response.ok) {
    throw new Error('Failed to check album status');
  }
  
  return await response.json();
};

// Rent an album
export const rentAlbum = async (albumId) => {
  const response = await fetch(TRANSACTION_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ album_id: albumId.toString() }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to rent album');
  }
  
  return await response.json();
};

// Return an album
export const returnAlbum = async (transactionId) => {
  const response = await fetch(`${TRANSACTION_API_URL}/${transactionId}/return`, {
    method: 'PATCH',
  });
  
  if (!response.ok) {
    throw new Error('Failed to return album');
  }
  
  return await response.json();
};

// Get all active transactions
export const getActiveTransactions = async () => {
  const response = await fetch(`${TRANSACTION_API_URL}/active`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch active transactions');
  }
  
  return await response.json();
};