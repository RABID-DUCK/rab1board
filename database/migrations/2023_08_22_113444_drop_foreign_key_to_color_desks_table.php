<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('color_desks', function (Blueprint $table) {
            $table->dropForeign(['color_id']);
            $table->dropColumn('color_id');
            $table->dropForeign(['desk_id']);
            $table->dropColumn('desk_id');
        });
        Schema::dropIfExists('color_desks');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('color_desks', function (Blueprint $table) {
            //
        });
    }
};
