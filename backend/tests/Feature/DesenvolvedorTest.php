<?php

namespace Tests\Feature;

use App\Models\Desenvolvedor;
use App\Models\Nivel;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DesenvolvedorTest extends TestCase
{
    use DatabaseTransactions;

    public function test_lista_dev()
    {
        $nivel = Nivel::create(['nivel' => 'PlenoTeste']);
        Desenvolvedor::create([
            'nome' => 'Kaio',
            'sexo' => 'M',
            'data_nascimento' => '1998-04-01',
            'nivel_id' => $nivel->id
        ]);
        $response = $this->get('/api/desenvolvedor');
        $response->assertOk();
    }

    public function test_cria_dev()
    {
        $nivel = Nivel::create(['nivel' => 'PlenoTeste']);
        $data = ['nome' => 'Kaio', 'sexo' => 'M', 'data_nascimento' => '1998-04-01', 'hobby' => 'Musica', 'nivel_id' => $nivel->id];
        $response = $this->postJson('/api/desenvolvedor', $data);
        $response->assertCreated();
    }

    public function test_valida_dev()
    {
        $response = $this->postJson('/api/desenvolvedor', []);
        $response->assertStatus(422);
    }

    public function test_edita_dev()
    {
        $nivel = Nivel::create(['nivel' => 'PlenoTeste']);
        $dev = Desenvolvedor::create(['nome' => 'Kaio', 'sexo' => 'M', 'data_nascimento' => '1998-04-01', 'nivel_id' => $nivel->id]);
        $response = $this->putJson('/api/desenvolvedor/' . $dev->id, [
            'nome' => 'Kaio Araújo',
            'sexo' => 'M',
            'data_nascimento' => '1998-04-01',
            'nivel_id' => $nivel->id
        ]);
        $response->assertOk();
    }

    public function test_deleta_dev()
    {
        $nivel = Nivel::create(['nivel' => 'PlenoTeste']);
        $dev = Desenvolvedor::create(['nome' => 'Kaio', 'sexo' => 'M', 'data_nascimento' => '1998-04-01', 'nivel_id' => $nivel->id]);
        $response = $this->delete('/api/desenvolvedor/' . $dev->id);
        $response->assertOk();
    }

    public function test_busca_dev()
    {
        $nivel = Nivel::create(['nivel' => 'PlenoTeste']);
        Desenvolvedor::create(['nome' => 'Kaio', 'sexo' => 'M', 'data_nascimento' => '1998-04-01', 'nivel_id' => $nivel->id]);
        $response = $this->get('/api/desenvolvedor?search=kaio');
        $response->assertOk();
    }
}
