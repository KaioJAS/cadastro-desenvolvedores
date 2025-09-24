<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\NivelService;
use Illuminate\Http\Request;

class NivelController extends Controller
{

    public function __construct(
        private NivelService $service
    ) {}

    public function listarNiveis(Request $request)
    {
        $data = $request->input('search', '');
        $perPage = $request->input('per_page', 10);
        $response = $this->service->getListNivelService($data, $perPage);
        return $response;
    }

    public function criarNiveis(Request $request)
    {
        $nivel = $this->service->createNivel($request->all());
        return response()->json($nivel, 201);
    }
    public function atualizarNivel(Request $request, string $id)
    {
        $nivel = $this->service->updateNivel($id, $request->all());
        return response()->json($nivel);
    }

    public function excluirNivel(string $id)
    {
        $this->service->deleteNivel($id);
        return response()->json(['message' => 'Nível excluído com sucesso']);
    }
}
