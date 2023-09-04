<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Comments
 *
 * @property int $id
 * @property string $title
 * @property int $count_likes
 * @property int $task_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Comments newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Comments newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Comments query()
 * @method static \Illuminate\Database\Eloquent\Builder|Comments whereCountLikes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comments whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comments whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comments whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comments whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comments whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comments whereUserId($value)
 * @mixin \Eloquent
 */
class Comments extends Model
{
    use HasFactory;
    protected $table = 'comments';
    protected $guarded = false;
}
