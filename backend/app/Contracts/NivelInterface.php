<?php

namespace App\Contracts;

interface NivelInterface
{
    public function getListNivelService($search = null, $perPage = 15);
    public function createNivel(array $data);
    public function updateNivel($id, array $data);
    public function deleteNivel($id);
}
