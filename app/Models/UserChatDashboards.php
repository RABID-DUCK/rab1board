<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserChatDashboards extends Model
{
    use HasFactory;
    protected $table = 'user_chat_dashboards';
    protected $fillable = ['chat_dashboard_id', 'user_id'];
    protected $hidden = ['created_at', 'updated_at'];
}
