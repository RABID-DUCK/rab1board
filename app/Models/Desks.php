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

    public function dashboard()
    {
        return $this->belongsTo(Dashboards::class, 'id', 'dashboard_id');
    }

    public function column()
    {
        return $this->belongsTo(Columns::class, 'id', 'column_id');
    }
}
