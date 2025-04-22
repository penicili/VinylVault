<?php

use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

// Get all transactions
Route::get('/transactions', [TransactionController::class, 'getAllTransactions']);

// Create a new transaction
Route::post('/transactions', [TransactionController::class, 'createTransaction']);

// Return an album (mark transaction as returned)
Route::patch('/transactions/{transactionId}/return', [TransactionController::class, 'returnAlbum']);

// Check if album is currently borrowed
Route::get('/check-album-status', [TransactionController::class, 'checkAlbumStatus']);

// Get transaction details with album information
Route::get('/transactions/{transactionId}', [TransactionController::class, 'getTransactionDetails']);

// Get all borrowed albums
Route::get('/borrowed-albums', [TransactionController::class, 'getBorrowedAlbums']);

