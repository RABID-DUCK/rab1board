<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Columns extends Model
{
    use HasFactory;
    protected $table = 'columns';
    protected $guarded = false;

    public function desks()
    {
        return $this->hasMany(Desks::class, 'id', 'desk_id');
    }
}
