<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Tasks
 *
 * @property int $id
 * @property string $title
 * @property string $name_task
 * @property string $emoji
 * @property int $desk_id
 * @property string $data_start
 * @property string $data_end
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Tasks newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tasks newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tasks query()
 * @method static \Illuminate\Database\Eloquent\Builder|Tasks whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tasks whereDataEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tasks whereDataStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tasks whereDeskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tasks whereEmoji($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tasks whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tasks whereNameTask($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tasks whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tasks whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Tasks extends Model
{
    use HasFactory;

    protected $table = 'tasks';
    protected $guarded = false;
}
