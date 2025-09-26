<?php

namespace App\Services;

use App\Models\Nivel;
use App\Contracts\NivelInterface;

class NivelService implements NivelInterface
{
    public function getListNivelService($search = null, $perPage = 15, $campo = null, $ordem = 'asc')
    {
        try {
            $query = Nivel::withCount('desenvolvedores');
            if ($search) {
                $query->where('nivel', 'ILIKE', '%' . $search . '%');
            }
            if ($campo) {
                $query->orderBy($campo, $ordem);
            }
            return $query->paginate($perPage);
        } catch (\Exception $e) {
            throw new \Exception("Erro ao buscar niveis.");
        }
    }

    public function createNivel($data)
    {
        try {
            return Nivel::create($data);
        } catch (\Exception $e) {
            throw new \Exception("Erro ao criar nivel.");
        }
    }

    public function updateNivel($id, $data)
    {
        try {
            $nivel = Nivel::findOrFail($id);
            $nivel->update($data);
            return $nivel;
        } catch (\Exception $e) {
            throw new \Exception("Erro ao atualizar nivel.");
        }
    }

    public function deleteNivel($id)
    {
        try {
            $nivel = Nivel::findOrFail($id);
            $countDesenvolvedores = $nivel->desenvolvedores()->count();
            if ($countDesenvolvedores > 0) {
                throw new \Exception("Não é possível excluir este nível pois existem desenvolvedores vinculados.");
            }
            $nivel->delete();
            return $nivel;
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
