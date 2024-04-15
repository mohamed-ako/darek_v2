<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FavoriteProperty extends Model
{
    use HasFactory;

    protected $table = 'favoriteproperty'; // Name of the table

    protected $fillable = [
        'user_id',
        'property_id',
        // Add other columns of your table here
    ];

    // Define relationships if any
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function property()
    {
        return $this->belongsTo(Property::class, 'property_id');
    }
}
