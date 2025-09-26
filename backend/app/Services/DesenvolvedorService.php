<?php

namespace App\Services;

use App\Models\Desenvolvedor;
use App\Contracts\DesenvolvedorInterface;

class DesenvolvedorService implements DesenvolvedorInterface
{
    public function getListDesenvolvedorService($search = null, $perPage = 15, $campo = null, $ordem = 'asc')
    {
        try {
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
            if ($campo) {
                $query->orderBy($campo, $ordem);
            }
            return $query->paginate($perPage);
        } catch (\Exception $e) {
            throw new \Exception("Erro ao buscar desenvolvedores.");
        }
    }

    public function createDesenvolvedor($data)
    {
        try {
            return Desenvolvedor::create($data);
        } catch (\Exception $e) {
            throw new \Exception("Erro ao criar desenvolvedor.");
        }
    }

    public function updateDesenvolvedor($id, $data)
    {
        try {
            $desenvolvedor = Desenvolvedor::findOrFail($id);
            $desenvolvedor->update($data);
            return $desenvolvedor;
        } catch (\Exception $e) {
            throw new \Exception("Erro ao atualizar desenvolvedor.");
        }
    }

    public function deleteDesenvolvedor($id)
    {
        try {
            $desenvolvedor = Desenvolvedor::findOrFail($id);
            $desenvolvedor->delete();
            return $desenvolvedor;
        } catch (\Exception $e) {
            throw new \Exception("Erro ao excluir desenvolvedor.");
        }
    }
}
