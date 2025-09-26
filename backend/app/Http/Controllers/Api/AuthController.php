<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->email;
        $senha = $request->password;

        if (!$email || !$senha) {
            return response()->json(['message' => 'Dados obrigatórios'], 400);
        }

        $user = User::where('email', $email)->first();

        if (!$user || !Hash::check($senha, $user->password)) {
            return response()->json(['message' => 'Login inválido'], 401);
        }

        $token = base64_encode($user->id . '|' . time());

        return response()->json([
            'nome' => $user->name,
            'token' => $token
        ]);
    }
}
