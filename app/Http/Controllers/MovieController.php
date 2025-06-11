<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;

class MovieController extends Controller
{    
    public function store(Request $request){
        $validated = $request->validate([
            "name" => 'required|unique:movies|max:255|string',
            "info" => 'required|max:255|string' ,
            "poster"=> 'required|file',
            "length" => 'required|integer',
            "origin" => 'required|max:56|string'
        ]);

        $name = $request->input('name');
        $info = $request->input('info');
        $poster = $request->input('poster');
        $length = $request->input('length');
        $origin = $request->input('origin');

        $posterName = time().'.'.$request->poster->extension();
        $request->poster->move(public_path('images/admin'), $posterName);

        Movie::create(
            ["name"=>$name,
            "info"=>$info,
            "poster"=>$posterName,
            "length"=>$length,
            "origin"=>$origin,]
        );
        return redirect('/admin');
    }
}
