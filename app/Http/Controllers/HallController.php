<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hall;
use App\Models\Movie;
use Illuminate\Database\Eloquent\Collection;

class HallController extends Controller
{    
    private function getHallNumber(Collection  $halls){
        $a = true;
        $b = 0;
        if(count($halls) === 0){
           return 1; 
        }
        while($a){
            $b = $b + 1;
            foreach($halls as $key => $hall)
            {
                if ( $hall["number"] !== $b )
                    $a = false;
            }
            
        }
        return $b;
    }
    public function store(Request $request){
        $token = csrf_token();
        $halls = Hall::all();
        $number = HallController::getHallNumber($halls);
        Hall::create([
            "number"=>$number,
            "seats"=>'[]',
            "standartCosts"=>1,
            "vipCosts"=>1,
            "isActive"=>false,
        ]);
        return redirect()->route("admin");
    }

    public function delete(int $hall){
        $deleteElement = Hall::find($hall);
        $deleteElement->delete();
    }

    public function show(int $hall){
        $showElement = Hall::find($hall);
        return response()->json(["element"=>$showElement, 'success' => true], 200, ['Content-Type' => 'application/json']);
    }

    public function update(Request $request, int $hall){
        $validated = $request->validate([
            "seats" => "required|string",
        ]);
        $saveElement = Hall::find($hall);
        $seats = $request->input("seats");
        $saveElement->seats = $seats;
        $saveElement->save();
        return response()->json(['seats'=>$seats,'success' => true], 200, ['Content-Type' => 'application/json']);
    }

    public function setCosts(Request $request, int $hall){
        $validated = $request->validate([
            "standartCosts" => 'required|integer',
            "vipCosts" => 'required|integer',
        ]);

        $saveElement = Hall::find($hall);
        $standartCosts = $request->input("standartCosts");
        $vipCosts = $request->input("vipCosts");
        $saveElement->standartCosts = $standartCosts;
        $saveElement->vipCosts = $vipCosts;
        $saveElement->save();
        return response()->json(['seats'=>$saveElement,'success' => true], 200, ['Content-Type' => 'application/json']);
    }

    public function changeActive(Request $request, int $hall){
        $validated = $request->validate([
            "isActive" => "required|boolean",
        ]);

        $saveElement = Hall::find($hall);
        $isActive = $request->input("isActive");
        $saveElement->isActive = !$isActive;
        $saveElement->save();
        return response()->json(['seats'=>$saveElement,'success' => true], 200, ['Content-Type' => 'application/json']);
    }

    public function getAll(Request $request){
        $validated = $request->validate([
            "isActive" => "required|boolean",
        ]);
        $halls = Hall::all();
        return $halls;
    }
}
