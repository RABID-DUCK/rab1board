<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
           'name' => "Masya Sagitov",
           'login' => 'Rab1d',
           'email' => 'onetaphack@gmail.com',
           'password' => Hash::make('LObzik12345'),
            'role_id' => 2,
            'remember_token' => Str::random(60)
        ]);
    }
}
