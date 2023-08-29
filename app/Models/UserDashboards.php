<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDashboards extends Model
{
    use HasFactory;
    protected $table = 'user_dashboards';
    protected $guarded = false;
}
