<?php

namespace Tests\Feature;

use App\Models\Desenvolvedor;
use App\Models\Nivel;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class NivelTest extends TestCase
{
    use DatabaseTransactions;

    public function test_lista_nivel()
    {
        Nivel::create(['nivel' => 'PlenoTeste']);
        $response = $this->get('/api/niveis');
        $response->assertOk();
    }

    public function test_cria_nivel()
    {
        $response = $this->postJson('/api/niveis', ['nivel' => 'PlenoTeste']);
        $response->assertCreated();
    }

    public function test_valida_nivel()
    {
        $response = $this->postJson('/api/niveis', []);
        $response->assertStatus(422);
    }

    public function test_edita_nivel()
    {
        $nivel = Nivel::create(['nivel' => 'PlenoTeste']);
        $response = $this->putJson('/api/niveis/' . $nivel->id, ['nivel' => 'PlenoTeste']);
        $response->assertOk();
    }

    public function test_deleta_nivel()
    {
        $nivel = Nivel::create(['nivel' => 'PlenoTeste']);
        $response = $this->delete('/api/niveis/' . $nivel->id);
        $response->assertOk();
    }

    public function test_nao_deleta_nivel_com_dev()
    {
        $nivel = Nivel::create(['nivel' => 'PlenoTeste']);
        Desenvolvedor::create([
            'nome' => 'Kaio',
            'sexo' => 'M',
            'data_nascimento' => '1998-04-01',
            'nivel_id' => $nivel->id
        ]);
        $response = $this->delete('/api/niveis/' . $nivel->id);
        $response->assertStatus(400);
    }
}
