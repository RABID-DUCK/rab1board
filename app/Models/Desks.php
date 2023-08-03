<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Desks extends Model
{
    use HasFactory;

    protected $table = 'desks';
    protected $guarded = false;

    protected $hidden = [
        'task_id'
    ];
}
