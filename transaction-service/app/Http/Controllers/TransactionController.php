<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TransactionController extends Controller
{
    /**
     * Get all transactions
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllTransactions()
    {
        $transactions = Transaction::all();
        
        return response()->json([
            'data' => $transactions
        ]);
    }
    
    /**
     * Create a new transaction
     */
    public function createTransaction(Request $request)
    {
        $request->validate([
            'album_id' => 'required|string|max:25',
        ]);
        
        $albumId = $request->album_id;
        
        // First check if album is available in inventory
        $inventoryResponse = Http::get('http://localhost:8081/api/inventory/' . $albumId);
        
        if (!$inventoryResponse->successful()) {
            return response()->json([
                'message' => 'Failed to check album availability',
                'error' => 'Inventory service unavailable'
            ], 503);
        }
        
        $responseData = $inventoryResponse->json();
        
        // Extract album data from the response structure
        if (!isset($responseData['data']) || !isset($responseData['data']['is_available'])) {
            return response()->json([
                'message' => 'Failed to check album availability',
                'error' => 'Invalid response from inventory service'
            ], 502);
        }
        
        $albumData = $responseData['data'];
        
        // Check if album is available
        if (!$albumData['is_available']) {
            return response()->json([
                'message' => 'Cannot borrow this album',
                'error' => 'Album is not available for borrowing'
            ], 400);
        }
        
        // Also check if album is already borrowed in our system
        $existingTransaction = Transaction::where('album_id', $albumId)
            ->where('is_returned', false)
            ->first();
            
        if ($existingTransaction) {
            return response()->json([
                'message' => 'Cannot borrow this album',
                'error' => 'Album is already borrowed',
                'transaction_id' => $existingTransaction->transaction_id
            ], 400);
        }
        
        // If album is available and not borrowed, create transaction
        $transaction = new Transaction();
        $transaction->album_id = $albumId;
        $transaction->is_returned = false;
        $transaction->save();
        
        return response()->json([
            'message' => 'Transaction created successfully',
            'transaction' => $transaction
        ], 201);
    }

    /**
     * Mark a transaction as returned
     */
    public function returnAlbum($transactionId)
    {
        $transaction = Transaction::findOrFail($transactionId);
        
        if ($transaction->is_returned) {
            return response()->json([
                'message' => 'Album was already returned',
                'transaction' => $transaction
            ]);
        }
        
        $transaction->is_returned = true;
        $transaction->save();
        
        return response()->json([
            'message' => 'Album returned successfully',
            'transaction' => $transaction
        ]);
    }

    /**
     * Check if album is currently borrowed (not returned)
     */
    public function checkAlbumStatus(Request $request)
    {
        $albumId = $request->album_id;
        
        $transaction = Transaction::where('album_id', $albumId)
            ->where('is_returned', false)
            ->first();
            
        return response()->json([
            'is_borrowed' => !is_null($transaction),
            'transaction_id' => $transaction?->transaction_id
        ]);
    }
    
    /**
     * Get transaction details with album information
     */
    public function getTransactionDetails($transactionId)
    {
        $transaction = Transaction::findOrFail($transactionId);
        
        // Fetch album details from inventory service
        $albumResponse = Http::get('http://localhost:8081/api/inventory/' . $transaction->album_id);
        
        if ($albumResponse->successful()) {
            $responseData = $albumResponse->json();
            
            // Extract album data from the response structure
            $albumDetails = $responseData['data'] ?? null;
            
            return response()->json([
                'transaction' => $transaction,
                'album' => $albumDetails
            ]);
        }
        
        return response()->json([
            'transaction' => $transaction,
            'album' => null,
            'error' => 'Failed to fetch album details'
        ], 200);
    }
}
