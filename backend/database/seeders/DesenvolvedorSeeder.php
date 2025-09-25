<?php

namespace Database\Seeders;

use App\Models\Desenvolvedor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DesenvolvedorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Desenvolvedor::factory(30)->create();
    }
}
