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
        Schema::create('color_desks', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('color_id')->unsigned();
            $table->bigInteger('desk_id')->unsigned();

            $table->foreign('color_id')->references('id')->on('colors')->onDelete('cascade');
            $table->foreign('desk_id')->references('id')->on('desks')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('color_desks', function (Blueprint $table) {
            $table->dropForeign(['desk_id']);
            $table->dropForeign(['color_id']);
            $table->dropColumn('color_id');
            $table->dropColumn('desk_id');
        });

        Schema::dropIfExists('color_desks');
    }
};
