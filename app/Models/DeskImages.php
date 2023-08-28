<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeskImages extends Model
{
    use HasFactory;
    protected $table = 'desk_images';
    protected $guarded = false;
}
