<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use App\Models\Movie;
use App\Models\Hall;

class Seance extends Model
{
    protected $table = "seances";
    protected $fillable = [
        "hall",
        "movie",
        "day",
        "start",
        "finish",
    ];
    public function fullHall(){
        return $this->hasOne(Hall::class, "number", "hall");
    }
    public function fullMovie(){
        return $this->hasOne(Movie::class, "name", "movie");
    }
}
