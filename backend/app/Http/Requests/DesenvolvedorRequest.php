<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DesenvolvedorRequest extends FormRequest
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
            'nome' => 'required|string|max:255',
            'sexo' => 'required|in:M,F',
            'data_nascimento' => 'required|date',
            'hobby' => 'nullable|string|max:255',
            'nivel_id' => 'required|integer',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'Nome é obrigatório.',
            'sexo.required' => 'Sexo é obrigatório.',
            'sexo.in' => 'Sexo deve ser M ou F.',
            'data_nascimento.required' => 'Data de nascimento é obrigatória.',
            'data_nascimento.date' => 'Data invalida.',
            'nivel_id.required' => 'Nivel é obrigatório.',
            'nivel_id.integer' => 'Nivel deve ser um numero.',
        ];
    }
}
