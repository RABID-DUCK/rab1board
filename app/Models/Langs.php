<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Langs
 *
 * @property int $id
 * @property string $name
 * @property string $ru
 * @property string $en
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Langs newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Langs newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Langs query()
 * @method static \Illuminate\Database\Eloquent\Builder|Langs whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Langs whereEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Langs whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Langs whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Langs whereRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Langs whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Langs extends Model
{
    use HasFactory;

    protected $table = 'langs';
    protected $guarded = false;
}
