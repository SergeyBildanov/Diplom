<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $table = "movies";
    protected $fillable = [
        "name",
        "info",
        "poster",
        "length",
        "origin",
    ];

    public function seances(){
        return $this->hasMany(Seance::class, 'name', 'movie');
    }
}
