<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $table = 'notifications';
    protected $guarded = false;

    public function getType(){
        return $this->hasOne(NotificationType::class, 'id', 'type_id');
    }

    public function getUser(){
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
