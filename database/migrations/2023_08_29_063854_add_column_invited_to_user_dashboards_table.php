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
        Schema::table('user_dashboards', function (Blueprint $table) {
            $table->boolean('invited')->default(false)->after('dashboard_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_dashboards', function (Blueprint $table) {
            $table->dropColumn('invited');
        });
    }
};
