<?php

use App\Http\Controllers\InventoryController;
use Illuminate\Support\Facades\Route;

// Inventory Service API Routes
Route::prefix('inventory')->group(function () {  
    // Get semua inventory items
    Route::get('/', [InventoryController::class, 'index']);
    // Get inventory items yang tersedia
    Route::get('/available', [InventoryController::class, 'available']);
    // Search inventory items by title
    Route::get('/search/{title}', [InventoryController::class, 'search']);
    // search inventory items by id
    Route::get('/{id}', [InventoryController::class, 'show']);
    // post album baru
    Route::post('/', [InventoryController::class, 'store']);
    // edit album
    Route::put('/{id}', [InventoryController::class, 'update']);
    // delete album
    Route::delete('/{id}', [InventoryController::class, 'destroy']);
    // update availability
    Route::patch('/{id}/availability', [InventoryController::class, 'updateAvailability']);
    
});