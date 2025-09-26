<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthToken
{
    public function handle(Request $request, Closure $next)
    {
        $auth = $request->header('Authorization');

        if (!$auth) {
            return response()->json(['message' => 'Acesso negado'], 401);
        }

        $token = str_replace('Bearer ', '', $auth);
        $data = base64_decode($token);

        if (!$data || !str_contains($data, '|')) {
            return response()->json(['message' => 'Token inválido'], 401);
        }

        return $next($request);
    }
}