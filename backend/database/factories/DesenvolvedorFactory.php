<?php

namespace Database\Factories;

use App\Models\Nivel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Desenvolvedor>
 */
class DesenvolvedorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome' => $this->faker->name(),
            'sexo' => $this->faker->randomElement(['M', 'F']),
            'data_nascimento' => $this->faker->dateTimeBetween('-50 years', '-18 years')->format('Y-m-d'),
            'hobby' => $this->faker->randomElement(['Corrida', 'Futebol', 'Ler', 'Jogos', 'Música', 'Filmes', 'Series']),
            'nivel_id' => Nivel::inRandomOrder()->first()->id,
        ];
    }
}
