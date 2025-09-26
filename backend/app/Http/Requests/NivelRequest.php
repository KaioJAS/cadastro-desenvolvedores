<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NivelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nivel' => 'required|string|max:255|min:2',
        ];
    }

    public function messages(): array
    {
        return [
            'nivel.required' => 'O nome do nivel é obrigatório.',
            'nivel.string' => 'O nome do nivel deve ser um texto.',
            'nivel.max' => 'O nome do nivel não pode ter mais de 255 caracteres.',
            'nivel.min' => 'O nome do nivel deve ter pelo menos 2 caracteres.',
            'nivel.unique' => 'Já existe um nivel com este nome.',
        ];
    }
}
