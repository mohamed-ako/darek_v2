<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request; // Import Request class if not already imported
use App\Models\User;

class Property extends Model
{
    protected $table = 'property';
    protected $primaryKey = 'property_id';
    public $timestamps = false;

    // Define the relationship with PropertyImage model
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function images()
    {
        return $this->hasMany(PropertyImage::class, 'property_id', 'property_id');
    }

    // Define other relationships if needed
}



// namespace App\Models;

// use Illuminate\Database\Eloquent\Model;

// class Property extends Model
// {
//     protected $table = 'property';
//     protected $primaryKey = 'property_id';
//     public $timestamps = false;

//     // Define the relationship with PropertyImage model
//     public function images()
//     {
//         return $this->hasMany(PropertyImage::class, 'property_id', 'property_id');
//     }

//     // Define other relationships if needed
// }
