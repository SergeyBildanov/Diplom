<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seance extends Model
{
    protected $table = "seances";
    protected $fillable = [
        "hall",
        "movie",
        "start",
    ];
}
