<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyImage extends Model
{
    protected $table = 'propertyimages';
    protected $primaryKey = 'image_id';
    public $timestamps = false;

    // Define the relationship with Property model
    public function property()
    {
        return $this->belongsTo(Property::class, 'property_id', 'property_id');
    }

    // Define other relationships if needed
}
