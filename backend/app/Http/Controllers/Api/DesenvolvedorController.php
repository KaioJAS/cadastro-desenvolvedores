<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DesenvolvedorRequest;
use App\Services\DesenvolvedorService;
use Illuminate\Http\Request;

class DesenvolvedorController extends Controller
{

    public function __construct(
        private DesenvolvedorService $service
    ) {}

    public function listarDesenvolvedores(Request $request)
    {
        try {
            $data = $request->input('search', '');
            $perPage = $request->input('per_page', 10);
            $response = $this->service->getListDesenvolvedorService($data, $perPage);
            return $response;
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }


    public function criarDesenvolvedores(DesenvolvedorRequest $request)
    {
        try {
            $nivel = $this->service->createDesenvolvedor($request->all());
            return response()->json($nivel, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
    public function atualizarDesenvolvedor(DesenvolvedorRequest $request, string $id)
    {
        try {
            $nivel = $this->service->updateDesenvolvedor($id, $request->all());
            return response()->json($nivel);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function excluirDesenvolvedor(string $id)
    {
        try {
            $this->service->deleteDesenvolvedor($id);
            return response()->json(['message' => 'Desenvolvedor excluído com sucesso']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}
