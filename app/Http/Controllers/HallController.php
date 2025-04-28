<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hall;

class HallController extends Controller
{    
    public function store(Request $request){
        $token = csrf_token();
        $number = $request->input('number');
        $seats = $request->input('seats');
        Hall::create([
            "number"=>$number,
            "seats"=>$seats,
        ]);
    }
}
