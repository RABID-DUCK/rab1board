<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dashboards extends Model
{
    use HasFactory;

    protected $table = 'dashboards';
    protected $guarded = false;

    public function getUsers(){
        return $this->hasMany(User::class, 'id', 'user_id');
    }
}
