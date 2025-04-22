<?php

use App\Http\Controllers\InventoryController;
use App\Http\Controllers\WebhookController;
use Illuminate\Support\Facades\Route;

// Default welcome route
Route::get('/', function () {
    return view('welcome');
});

