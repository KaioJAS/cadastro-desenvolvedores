<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NivelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('nivels')->insert([
            ['nivel' => 'Junior'],
            ['nivel' => 'Pleno'],
            ['nivel' => 'Senior'],
            ['nivel' => 'Especialista'],
            ['nivel' => 'Tech Lead'],
        ]);
    }
}
