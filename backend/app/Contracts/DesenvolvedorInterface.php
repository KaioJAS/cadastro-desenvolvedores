<?php

namespace App\Contracts;

interface DesenvolvedorInterface
{
    public function getListDesenvolvedorService($search = null, $perPage = 15);
    public function createDesenvolvedor(array $data);
    public function updateDesenvolvedor($id, array $data);
    public function deleteDesenvolvedor($id);
}
