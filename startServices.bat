@echo off
echo Base directory: %~dp0

REM Start inventory-service
cd "%~dp0inventory-service" || (echo Inventory service directory not found && exit /b 1)
echo Starting Inventory Service on port 8081... from directory %cd%
start cmd /k "php artisan serve --port=8081"
echo Inventory Service running on http://localhost:8081

REM Start transaction-service
cd "%~dp0transaction-service" || (echo Transaction service directory not found && exit /b 1)
echo Starting Transaction Service on port 8082... from directory %cd%
start cmd /k "php artisan serve --port=8082"
echo Transaction Service running on http://localhost:8082

REM Start Vite dev server
cd "%~dp0VinylVault-interface" || (echo Frontend directory not found && exit /b 1)
echo Starting Vite development server from directory %cd%
start cmd /k "npm run dev"
echo Vite development server started

echo.
echo Services started!
echo.
echo Each service is running in its own command window.
echo Close the command windows to stop the services.
echo.
echo Press any key to exit this window...
pause > nul