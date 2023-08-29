<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTasks extends Model
{
    use HasFactory;
    protected $table = 'user_tasks';
    protected $guarded = false;

    public function getUsers(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
