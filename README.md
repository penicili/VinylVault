# VinylVault
Tugas Pengganti UTS Integrasi Aplikasi Enterprise

## Kelompok 8 SI4606
Ihsan Nafil Athallah <br>
Rahadian Hasan Wirayuda <br>
Katon Bagaskoro <br>
Auveta Rizky Pratama <br>


## Services
1.  Inventory Service  => Album Database<br>
    Consume: All Borrowed Albums from Transaction Service<br>
    Provide: GET All Inventory<br>
             GET Inventory by ID<br>
             GET Inventory by Title<br>
             GET Available Inventory<br>
             POST New Album<br>
             PUT Album by Id<br>


2.  Transaction Service => Transaction Database <br>
    Consume: Cek Album by id ketika createTransaction from Inventory Service <br>
    Provide: POST Transaction<br>
             GET Album Status<br>
             PATCH Return Album<br>
             GET Transaction details using Id<br>
             GET All Transactions<br>
             GET All Borrowed albums<br>
             
## Extra
+ Deepseek AI Integration for Album Recomendations => <br>
    Consume: Most of provided API endpoints from Inventory & Transaction Services<br>
             Deepseek Platform for recommendations<br>
