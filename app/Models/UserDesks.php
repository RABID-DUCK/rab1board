<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDesks extends Model
{
    use HasFactory;
    protected $table = 'user_desks';
    protected $guarded = false;
}
