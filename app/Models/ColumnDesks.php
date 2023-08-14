<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ColumnDesks
 *
 * @property int $id
 * @property int $dashboard_id
 * @property int $column_id
 * @property int $desk_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ColumnDesks newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ColumnDesks newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ColumnDesks query()
 * @method static \Illuminate\Database\Eloquent\Builder|ColumnDesks whereColumnId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ColumnDesks whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ColumnDesks whereDashboardId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ColumnDesks whereDeskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ColumnDesks whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ColumnDesks whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ColumnDesks extends Model
{
    use HasFactory;

    protected $table = 'column_desks';
    protected $guarded = false;
}
