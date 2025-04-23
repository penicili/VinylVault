# VinylVault
Tugas Pengganti UTS Integrasi Aplikasi Enterprise

## Kelompok 8 SI4606
Ihsan Nafil Athallah <br>
Rahadian Hasan Wirayuda <br>
Katon Bagaskoro <br>
Auveta Rizky Pratama <br>


## Services
1. Transaction Service => Transaction Database
    Consume: Cek Album by id ketika createTransaction from Inventory Service 
    Provide: GET All Inventory
             GET Inventory by ID
             GET Inventory by Title
             GET Available Inventory
             POST New Album
             PUT Album by Id


2. Inventory Service  => Album Database
    Consume: All Borrowed Albums from Transaction Service
    Provide: POST Transaction
             GET Album Status
             PATCH Return Album
             GET Transaction details using Id
             GET All Transactions
             GET All Borrowed albums
             
## Extra
+ Deepseek AI Integration for Album Recomendations => 
    Consume: Most of provided API endpoints from Inventory & Transaction Services
             Deepseek Platform for recommendations


