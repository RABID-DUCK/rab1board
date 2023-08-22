<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Desks
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property int|null $task_id
 * @property string|null $image
 * @property string|null $status
 * @property string|null $data_start
 * @property string|null $data_end
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property int $dashboard_id
 * @property int $column_id
 * @property-read \App\Models\Columns|null $column
 * @property-read \App\Models\Dashboards|null $dashboard
 * @method static \Illuminate\Database\Eloquent\Builder|Desks newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Desks newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Desks query()
 * @method static \Illuminate\Database\Eloquent\Builder|Desks whereColumnId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Desks whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Desks whereDashboardId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Desks whereDataEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Desks whereDataStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Desks whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Desks whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Desks whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Desks whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Desks whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Desks whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Desks whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
        return $this->belongsTo(Dashboards::class, 'dashboard_id', 'id');
    }

    public function column()
    {
        return $this->belongsTo(Columns::class, 'column_id', 'id');
    }

    public function color(){
        return $this->hasMany(Colors::class, 'id', 'color_id');
    }
}
