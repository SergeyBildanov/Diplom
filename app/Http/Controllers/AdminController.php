<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hall;
use App\Models\Movie;
use App\Models\Seance;

class AdminController extends Controller
{
    public function index(){
        $halls = Hall::all();
        $movies = Movie::all();
        $seances = [];
        foreach($halls as $hall){
            $item = [
                "hall"=>$hall->number,
                "seances"=>$hall->seances
            ];
            array_push($seances, $hall->seances);
        }

        return view("admin.index", [
            'halls'=>$halls,
            'movies'=>$movies,
            'seances'=>$seances
        ]);
    }
}
