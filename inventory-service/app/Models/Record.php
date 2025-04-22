<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'artist',
        'album',
        'release_year',
        'genre',
        'condition',
        'catalog_number',
        'label',
        'cover_image',
        'description',
        'is_available'
    ];

    protected $casts = [
        'release_year' => 'integer',
        'is_available' => 'boolean'
    ];
}
