<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;

class MovieController extends Controller
{
    public function store(Request $request){
        $name = $request->input('name');
        $info = $request->input('info');
        $poster = $request->input('poster');
        $length = $request->input('length');
        $origin = $request->input('origin');

        Movie::create(
            ["name"=>$name,
            "info"=>$info,
            "poster"=>$poster,
            "length"=>$length,
            "origin"=>$origin,]
        );
        return redirect('/admin');
    }
}
