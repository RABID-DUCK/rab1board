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
        Schema::create('colors', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('color');

            $table->bigInteger('desk_id')->unsigned();
            $table->foreign('desk_id')->references('id')->on('desks')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('colors', function (Blueprint $table) {
        $table->dropForeign(['desk_id']);
    });
        Schema::dropIfExists('color_desks');
    }
};
