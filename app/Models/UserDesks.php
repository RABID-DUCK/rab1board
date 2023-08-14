<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UserDesks
 *
 * @property int $id
 * @property int $access
 * @property int $desk_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|UserDesks newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserDesks newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserDesks query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserDesks whereAccess($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserDesks whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserDesks whereDeskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserDesks whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserDesks whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserDesks whereUserId($value)
 * @mixin \Eloquent
 */
class UserDesks extends Model
{
    use HasFactory;
    protected $table = 'user_desks';
    protected $guarded = false;
}
