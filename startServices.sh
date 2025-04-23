#!/bin/bash

# Start inventory-service
cd "$(dirname "$0")/inventory-service"
echo "Starting Inventory Service on port 8081..."
php artisan serve --port=8081 &
INVENTORY_PID=$!

# Start transaction-service
cd "$(dirname "$0")/transaction-service"
echo "Starting Transaction Service on port 8082..."
php artisan serve --port=8082 &
TRANSACTION_PID=$!

echo "Services started!"
echo "Inventory Service running on http://localhost:8081"
echo "Transaction Service running on http://localhost:8082"
echo ""
echo "Press Ctrl+C to stop all services"

# Handle termination
trap "kill $INVENTORY_PID $TRANSACTION_PID; exit" SIGINT SIGTERM

# Keep script running until Ctrl+C
wait