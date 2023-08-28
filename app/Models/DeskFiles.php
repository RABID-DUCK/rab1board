<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeskFiles extends Model
{
    use HasFactory;
    protected $table = 'desk_files';
    protected $guarded = false;
}
