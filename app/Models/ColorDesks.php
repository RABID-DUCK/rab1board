<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ColorDesks
 *
 * @property int $id
 * @property int $color_id
 * @property int $desk_id
 * @method static \Illuminate\Database\Eloquent\Builder|ColorDesks newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ColorDesks newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ColorDesks query()
 * @method static \Illuminate\Database\Eloquent\Builder|ColorDesks whereColorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ColorDesks whereDeskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ColorDesks whereId($value)
 * @mixin \Eloquent
 */
class ColorDesks extends Model
{
    use HasFactory;
    protected $table = 'color_desks';
    protected $guarded = false;
}
