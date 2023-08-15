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
        Schema::create('user_desks', function (Blueprint $table) {
            $table->id();
            $table->boolean('access')->nullable();

            $table->bigInteger('desk_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();

            $table->foreign('desk_id')->references('id')->on('desks')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_desks', function (Blueprint $table) {
            $table->dropForeign(['desk_id']);
            $table->dropForeign(['user_id']);
        });
        Schema::dropIfExists('user_desks');
    }
};
