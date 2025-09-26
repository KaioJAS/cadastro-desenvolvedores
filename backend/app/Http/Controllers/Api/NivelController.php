<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\NivelRequest;
use App\Services\NivelService;
use Illuminate\Http\Request;

class NivelController extends Controller
{

    public function __construct(
        private NivelService $service
    ) {}

    public function listarNiveis(Request $request)
    {
        try {
            $data = $request->input('search', '');
            $perPage = $request->input('per_page', 10);
            $response = $this->service->getListNivelService($data, $perPage);
            return $response;
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function criarNiveis(NivelRequest $request)
    {
        try {
            $nivel = $this->service->createNivel($request->all());
            return response()->json($nivel, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function atualizarNivel(NivelRequest $request, string $id)
    {
        try {
            $nivel = $this->service->updateNivel($id, $request->all());
            return response()->json($nivel);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function excluirNivel(string $id)
    {
        try {
            $this->service->deleteNivel($id);
            return response()->json(['message' => 'Nível excluído com sucesso']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}
