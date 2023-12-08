<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Columns
 *
 * @property int $id
 * @property string $title
 * @property int $dashboard_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Desks> $desks
 * @property-read int|null $desks_count
 * @method static \Illuminate\Database\Eloquent\Builder|Columns newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Columns newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Columns query()
 * @method static \Illuminate\Database\Eloquent\Builder|Columns whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Columns whereDashboardId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Columns whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Columns whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Columns whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Columns extends Model
{
    use HasFactory;
    protected $table = 'columns';
    protected $guarded = false;

    public function desks()
    {
        return $this->hasMany(Desks::class, 'column_id');
    }

    public function desksColumn(){
        return $this->hasMany(Desks::class, 'column_id', 'id');
    }
}
