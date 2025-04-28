<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hall extends Model
{
   protected $table = 'halls';
   protected $fillable = [
    'number',
    'seats',
   ];
   public function seances(){
      return $this->hasMany(Seance::class, 'number', 'hall');
  }
}
