<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $table = 'property';
    protected $primaryKey = 'property_id';
    public $timestamps = false;

    // Define the relationship with PropertyImage model
    public function images()
    {
        return $this->hasMany(PropertyImage::class, 'property_id', 'property_id');
    }

    // Define other relationships if needed
}
