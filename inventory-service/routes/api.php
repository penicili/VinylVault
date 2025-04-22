<?php

use App\Http\Controllers\InventoryController;
use App\Http\Controllers\WebhookController;
use Illuminate\Support\Facades\Route;

// Inventory Service API Routes
Route::prefix('inventory')->group(function () {  // Note: removed 'api/' since api.php already has that prefix
    Route::get('/', [InventoryController::class, 'index']);
    Route::get('/available', [InventoryController::class, 'available']);
    Route::get('/search/{title}', [InventoryController::class, 'search']);
    Route::get('/{id}', [InventoryController::class, 'show']);
    Route::post('/', [InventoryController::class, 'store']);
    Route::put('/{id}', [InventoryController::class, 'update']);
    Route::delete('/{id}', [InventoryController::class, 'destroy']);
    Route::patch('/{id}/availability', [InventoryController::class, 'updateAvailability']);
    
    // Webhook endpoint for order service to update record availability
    Route::post('/webhooks/order-update', [WebhookController::class, 'orderUpdate']);
});