<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Colors
 *
 * @property int $id
 * @property string $title
 * @property string $color
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Colors newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Colors newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Colors query()
 * @method static \Illuminate\Database\Eloquent\Builder|Colors whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Colors whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Colors whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Colors whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Colors whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Colors extends Model
{
    use HasFactory;

    protected $table = 'colors';
    protected $guarded = false;
}
