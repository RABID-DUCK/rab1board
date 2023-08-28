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
        Schema::create('desk_files', function (Blueprint $table) {
            $table->id();
            $table->string('file');
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
        Schema::table('desk_images', function (Blueprint $table) {
            $table->dropForeign(['desk_id']);
            $table->dropColumn('desk_id');
        });
        Schema::dropIfExists('desk_files');
    }
};
