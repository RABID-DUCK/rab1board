<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NotifcationTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('notification_types')->insert([
            'type' => "invite_dashboard",
        ]);
        DB::table('notification_types')->insert([
            'type' => "add_desk",
        ]);
        DB::table('notification_types')->insert([
            'type' => "add_you_desk",
        ]);
        DB::table('notification_types')->insert([
            'type' => "deadline",
        ]);
        DB::table('notification_types')->insert([
            'type' => "comment",
        ]);
        DB::table('notification_types')->insert([
            'type' => "chat",
        ]);
        DB::table('notification_types')->insert([
            'type' => "join_to_dashboard",
        ]);
    }
}
