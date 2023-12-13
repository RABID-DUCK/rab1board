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
        Schema::create('user_chat_dashboards', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('chat_dashboard_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('chat_dashboard_id')->references('id')->on('chat_dashboards')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('messages_chat_dashboards', function (Blueprint $table) {
            $table->dropForeign(['chat_dashboard_id']);
            $table->dropColumn('chat_dashboard_id');
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });

        Schema::dropIfExists('user_chat_dashboards');
    }
};
