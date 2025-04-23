#!/bin/bash

# Set the base directory
BASE_DIR="$(dirname "$(readlink -f "$0")")"
echo "Base directory: $BASE_DIR"

# Start inventory-service
cd "$BASE_DIR/inventory-service" || { echo "Inventory service directory not found"; exit 1; }
echo "Starting Inventory Service on port 8081... from directory $(pwd)"
php artisan serve --port=8081 &
INVENTORY_PID=$!

# Start transaction-service
cd "$BASE_DIR/transaction-service" || { echo "Transaction service directory not found"; exit 1; }
echo "Starting Transaction Service on port 8082... from directory $(pwd)"
php artisan serve --port=8082 &
TRANSACTION_PID=$!

# Start Vite for frontend
cd "$BASE_DIR/VinylVault-interface" || { echo "Frontend directory not found"; exit 1; }
echo "Starting Vite development server from directory $(pwd)"
npm run dev &
FRONTEND_PID=$!

echo "Services started!"
sleep 1
echo "Inventory Service running on http://localhost:8081"
sleep 1
echo "Transaction Service running on http://localhost:8082"
sleep 1
echo "Vite development server started"
echo ""
echo "Press Ctrl+C to stop all services"

# Handle termination
trap "kill $INVENTORY_PID $TRANSACTION_PID $FRONTEND_PID; exit" SIGINT SIGTERM

# Keep script running until Ctrl+C
wait