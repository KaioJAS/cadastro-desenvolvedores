<?php

use App\Http\Controllers\Api\DesenvolvedorController;
use App\Http\Controllers\Api\NivelController;
use Illuminate\Support\Facades\Route;

Route::get('niveis', [NivelController::class, 'listarNiveis']);
Route::post('niveis', [NivelController::class, 'criarNiveis']);
Route::put('niveis/{id}', [NivelController::class, 'atualizarNivel']);
Route::delete('niveis/{id}', [NivelController::class, 'excluirNivel']);

Route::get('desenvolvedor', [DesenvolvedorController::class, 'listarDesenvolvedores']);
Route::post('desenvolvedor', [DesenvolvedorController::class, 'criarDesenvolvedores']);
Route::put('desenvolvedor/{id}', [DesenvolvedorController::class, 'atualizarDesenvolvedor']);
Route::delete('desenvolvedor/{id}', [DesenvolvedorController::class, 'excluirDesenvolvedor']);
