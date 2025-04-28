<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hall;

class HallController extends Controller
{    
    public function store(Request $request){
        $number = $request->input('number');
        $seats = $request->input('seats');
        Hall::create([
            "nubmer"=>$number,
            "seats"=>$seats,
        ]);
    }
}
