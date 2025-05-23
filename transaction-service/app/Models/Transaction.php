<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $primaryKey = 'transaction_id';
    
    protected $casts = [
        'is_returned' => 'boolean',
    ];
}
