<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Validation\Rule;
use App\Models\Movie;
use App\Models\Seance;
use App\Models\Hall;
use Illuminate\Support\Str;

class SeanceController extends Controller
{
    private function getFinish(string $time, int $length){
        [$hours, $minutes] = Str::of($time)->split("~:~");
        $addHours = floor($length/60);
        $addMinutes = $length-$addHours*60;
        $hours = $hours + $addHours;
        $minutes = $minutes + $addMinutes;
        $result = "$hours:$minutes";
        return $result;
    }

    private function isValid(array $array, array $item){
        $is_valid = true;
        usort($array, function($a, $b){
            return strtotime($a["start"]) - strtotime($b["start"]);
        });
        $index = array_search($item, $array);
        if($index-1 >= 0){
            $num = (int)$array[$index-1]["length"];
            $is_valid = $is_valid && abs(strtotime($array[$index-1]["start"])-strtotime($array[$index]["start"]))/60 >= (int)$num;
        }
        if($index+1 <= count($array)-1){
            $num = (int)$array[$index]["length"];
            $is_valid = $is_valid && abs(strtotime($array[$index+1]["start"])-strtotime($array[$index]["start"]))/60 >= (int)$num;
        }
        return $is_valid;
    }
    public function store(Request $request){
        $validated = $request->validate([
            "hall" => "required|integer",
            "film" => "required|string|max:255",
            "day" => 'required|date|after:today',
            "start"=> ['required', 'max:5', Rule::unique("seances","start")->where("hall", $request->input("hall"))],
        ]);

        $hall = $request->input("hall");
        $film = $request->input("film");
        $day = $request->input("day");
        $start = $request->input("start");
        $length = Movie::where("name", $film)->value("length");
        $fullHall = Hall::where("number", $hall)->first();
        $allSeances = $fullHall->seances;
        $times = [];
        if($allSeances){
            foreach($allSeances as $seance){
                $lengthS = Movie::where("name", $seance->movie)->value("length");
                array_push($times, [
                    "start"=>$seance->start,
                    "length" => $lengthS,
                ]);
            }
        }
        $validElement = ["start"=>$start, "length"=>$length];
        array_push($times, $validElement);

        if(! SeanceController::isValid($times, $validElement)){
            return response()->json(["success"=>false, "error"=>"Начало сеанса попадает в промежуток временисуществуюшего",]);
        }

        $finish = SeanceController::getFinish($start, $length);
        Seance::create(
            [
                "hall" => $hall,
                "movie" => $film,
                "day" => $day,
                "start" => $start,
                "finish" => $finish,
            ]
        );
        return redirect('/admin'); 
    }
    public function show(int $hall, Request $request){
        $validated = $request->validate([
            "day" => "required|date",
        ]);
        $day = $request->input("day");
        $seances = Seance::where([
            ["hall", $hall],
            ["day", $day]])->get();
        return response()->json([ 'success' => true, 'seances' => $seances ]);
    }
    public function delete(int $id){
        $deleteElement = Seance::find($id);
        $deleteElement->delete();
    }

    public function deleteAll(){
        $deleteArray = Seance::all();
        foreach($deleteArray as $item){
            $item->delete();
        }

        return response()->json([ 'success' => true]);
    }
    public function getAll(Request $request){
        $validated = $request->validate([
            "day" => "required|date",
            "isActive" => "required|boolean"
        ]);
        $day = $request->input("day");
        $isActive = $request->input("isActive") === "true"?1:0;
        $array = Seance::with("fullMovie")->whereHas("fullHall", function (Builder $q){
            $q->where('isActive', 1);
        })->where("day", $day)->get();
        return response()->json([ 'success' => true, 'seances' => $array]);
    }
    
}
