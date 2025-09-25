<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Desenvolvedor extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'desenvolvedors';

    protected $fillable = [
        'nivel_id',
        'nome',
        'sexo',
        'data_nascimento',
        'hobby'
    ];
    protected $casts = ['data_nascimento' => 'date', 'deleted_at' =>
    'datetime'];

    public function nivel()
    {
        return $this->belongsTo(Nivel::class);
    }
}
