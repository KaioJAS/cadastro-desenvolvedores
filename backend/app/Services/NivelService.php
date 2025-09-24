<?php

namespace App\Services;

use App\Models\Nivel;

class NivelService
{
    public function getListNivelService ($search = null, $perPage = 15)
    {
        $query = Nivel::query();
        if ($search) {
            $query->where('nivel', 'ILIKE', '%' . $search . '%');
        }
        return $query->paginate($perPage);
    }

    public function createNivel($data)
    {
        return Nivel::create($data);
    }

    public function updateNivel($id, $data)
    {
        $nivel = Nivel::findOrFail($id);
        $nivel->update($data);
        return $nivel;
    }

    public function deleteNivel($id)
    {
        $nivel = Nivel::findOrFail($id);
        $nivel->delete();
        return $nivel;
    }
}
