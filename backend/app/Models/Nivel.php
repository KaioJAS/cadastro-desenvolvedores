<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Nivel extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'nivels';

    protected $fillable = [
        'nivel'
    ];

    public function desenvolvedores()
    {
        return $this->hasMany(Desenvolvedor::class);
    }
}
