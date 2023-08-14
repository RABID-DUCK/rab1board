<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Rabid
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Rabid newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Rabid newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Rabid query()
 * @mixin \Eloquent
 */
class Rabid extends Model
{
    use HasFactory;

    public static function write_lang($lang, $rufileName = '', $enfileName = '')
    {
        $key = $lang->name;
        $ruValue = $lang->ru;
        $enValue = $lang->en;

        $ruFilePath = resource_path('lang/ru/'.$rufileName);
        $enFilePath = resource_path('lang/en/'.$enfileName);

        $ruContents = include $ruFilePath;
        $enContents = include $enFilePath;

        $ruContents[$key] = $ruValue;
        $enContents[$key] = $enValue;

        file_put_contents($ruFilePath, '<?php return '.var_export($ruContents, true).';');
        file_put_contents($enFilePath, '<?php return '.var_export($enContents, true).';');
    }
}
