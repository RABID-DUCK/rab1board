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
        Schema::create('column_desks', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('dashboard_id')->unsigned();
            $table->bigInteger('column_id')->unsigned();
            $table->bigInteger('desk_id')->unsigned();

            $table->foreign('dashboard_id')->references('id')->on('dashboards')->onDelete('cascade');
            $table->foreign('column_id')->references('id')->on('columns')->onDelete('cascade');
            $table->foreign('desk_id')->references('id')->on('desks')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('column_desks', function (Blueprint $table){
            $table->dropForeign(['dashboard_id']);
            $table->dropForeign(['column_id']);
            $table->dropForeign(['desk_id']);

            $table->dropColumn('dashboard_id');
            $table->dropColumn('column_id');
            $table->dropColumn('desk_id');
        });
        Schema::dropIfExists('column_desks');
    }
};
