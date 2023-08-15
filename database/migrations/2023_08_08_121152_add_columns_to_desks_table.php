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
        Schema::table('desks', function (Blueprint $table) {
            $table->bigInteger('dashboard_id')->unsigned();
            $table->bigInteger('column_id')->unsigned();

            $table->foreign('dashboard_id')->references('id')->on('dashboards');
            $table->foreign('column_id')->references('id')->on('columns');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('desks', function (Blueprint $table) {
            $table->dropForeign(['dashboard_id']);
            $table->dropForeign(['column_id']);

            $table->dropColumn('dashboard_id');
            $table->dropColumn('column_id');
        });
    }
};
