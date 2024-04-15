<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['sender_id', 'receiver_id', 'conversation_id', 'message', 'is_read'];

    // Add relationships or other methods if needed
    // public $timestamps = true;
}
