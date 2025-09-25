<?php

namespace App\Services;

use App\Models\Desenvolvedor;

class DesenvolvedorService
{
    public function getListDesenvolvedorService($search = null, $perPage = 15)
    {
        $query = Desenvolvedor::with('nivel');
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nome', 'ILIKE', '%' . $search . '%')
                    ->orWhere('hobby', 'ILIKE', '%' . $search . '%')
                    ->orWhereHas('nivel', function ($subQuery) use ($search) {
                        $subQuery->where('nivel', 'ILIKE', '%' . $search . '%');
                    });
            });
        }
        return $query->paginate($perPage);
    }

    public function createDesenvolvedor($data)
    {
        return Desenvolvedor::create($data);
    }

    public function updateDesenvolvedor($id, $data)
    {
        $nivel = Desenvolvedor::findOrFail($id);
        $nivel->update($data);
        return $nivel;
    }

    public function deleteDesenvolvedor($id)
    {
        $nivel = Desenvolvedor::findOrFail($id);
        $nivel->delete();
        return $nivel;
    }
}
