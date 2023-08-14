<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Dashboards
 *
 * @property int $id
 * @property string $title
 * @property int $user_id
 * @property int|null $desk_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Desks> $desks
 * @property-read int|null $desks_count
 * @method static \Illuminate\Database\Eloquent\Builder|Dashboards newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Dashboards newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Dashboards query()
 * @method static \Illuminate\Database\Eloquent\Builder|Dashboards whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dashboards whereDeskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dashboards whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dashboards whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dashboards whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dashboards whereUserId($value)
 * @mixin \Eloquent
 */
class Dashboards extends Model
{
    use HasFactory;

    protected $table = 'dashboards';
    protected $guarded = false;

    public function getUsers(){
        return $this->hasMany(User::class, 'id', 'user_id');
    }

    public function desks()
    {
        return $this->hasMany(Desks::class, 'id', 'desk_id');
    }
}
