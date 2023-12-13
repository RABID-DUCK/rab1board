<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessagesChatDashboard extends Model
{
    use HasFactory;
    protected $table = 'messages_chat_dashboards';
    protected $guarded = false;

    public function getUser(){
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
