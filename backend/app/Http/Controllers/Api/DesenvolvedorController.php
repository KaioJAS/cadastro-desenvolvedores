<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DesenvolvedorService;
use Illuminate\Http\Request;

class DesenvolvedorController extends Controller
{

    public function __construct(
        private DesenvolvedorService $service
    ) {}

    public function listarDesenvolvedores(Request $request)
    {
        $data = $request->input('search', '');
        $perPage = $request->input('per_page', 10);
        $response = $this->service->getListDesenvolvedorService($data, $perPage);
        return $response;
    }

    public function criarDesenvolvedores(Request $request)
    {
        $nivel = $this->service->createDesenvolvedor($request->all());
        return response()->json($nivel, 201);
    }
    public function atualizarDesenvolvedor(Request $request, string $id)
    {
        $nivel = $this->service->updateDesenvolvedor($id, $request->all());
        return response()->json($nivel);
    }

    public function excluirDesenvolvedor(string $id)
    {
        $this->service->deleteDesenvolvedor($id);
        return response()->json(['message' => 'Desenvolvedor excluído com sucesso']);
    }
}
