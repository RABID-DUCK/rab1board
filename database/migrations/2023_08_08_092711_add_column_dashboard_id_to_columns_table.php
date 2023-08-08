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
        Schema::table('columns', function (Blueprint $table) {
            $table->bigInteger('dashboard_id')->unsigned();
            $table->foreign('dashboard_id')->references('id')->on('dashboards')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('columns', function (Blueprint $table) {
            $table->dropForeign(['dashboard_id']);
            $table->dropColumn('dashboard_id');
        });
    }
};
