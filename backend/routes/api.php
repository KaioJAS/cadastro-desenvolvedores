<?php

use App\Http\Controllers\Api\NivelController;
use Illuminate\Support\Facades\Route;

Route::get('niveis', [NivelController::class, 'listarNiveis']);
Route::post('niveis', [NivelController::class, 'criarNiveis']);
Route::put('niveis/{id}', [NivelController::class, 'atualizarNivel']);
Route::delete('niveis/{id}', [NivelController::class, 'excluirNivel']);
