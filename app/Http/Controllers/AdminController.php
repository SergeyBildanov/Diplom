<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Hall;
use App\Models\Movie;
use App\Models\Seance;
use Illuminate\Support\Facades\Route;

use Endroid\QrCode\Color\Color;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Label\Label;
use Endroid\QrCode\Logo\Logo;
use Endroid\QrCode\RoundBlockSizeMode;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Writer\ValidationException;

class AdminController extends Controller
{
    public function index(){
        $allHalls = Hall::all();
        $notActive = Hall::where("isActive", 0)->get();
        $movies = Movie::all();

        return view("admin.index", [
            'halls'=>$allHalls,
            'notActive'=>$notActive,
            'movies'=>$movies,
        ]);
    }
    public function showSeance(int $id){
        $seance = Seance::find($id);
        $hall = $seance->fullHall;
        return view("user.hall", [
            'hall'=>$hall,
            'seance'=>$seance,
        ]);
    }

    public function showPayment(Request $request){
        $validated = $request->validate([
            "movie" => "required|string|max:255",
            "start" => "required|string|max:5",
            "hall" => "required|integer",
            "hall_id" => "required|integer",
            "seats" => "required|string"
        ]);
        $movie = $request->input("movie");
        $start = $request->input("start");
        $hall = $request->input("hall");
        $hall_id = $request->input("hall_id");
        $seats = json_decode($request->input("seats"));
        $sum = 0;
        $booked = "";
        foreach($seats as $seat){
            $sum = $sum + $seat->cost;
            $booked = $booked . $seat->seat . ";";
        }
        return view("user.payment", [
            'movie'=>$movie,
            'start'=>$start,
            'hall' => $hall,
            'hall_id' => $hall_id,
            'sum' => $sum,
            "booked" => substr($booked, 0, -1),
        ]);
    }
    public function showTicket(Request $request){
        $validated = $request->validate([
            "movie" => "required|string|max:255",
            "start" => "required|string|max:5",
            "hall" => "required|integer",
            "seats" => "required|string",
        ]);
        $movie = $request->input("movie");
        $start = $request->input("start");
        $hall = $request->input("hall");
        $seats = $request->input("seats");
        $text = "$movie;$start;$hall; Места:$seats";
        $filename =  "images/". time().'.png';
        $qrCode = new QrCode(
            data: $text,
            encoding: new Encoding('UTF-8'),
            errorCorrectionLevel: ErrorCorrectionLevel::Low,
            size: 200,
            margin: 10,
            roundBlockSizeMode: RoundBlockSizeMode::Margin,
            foregroundColor: new Color(0, 0, 0),
            backgroundColor: new Color(255, 255, 255,)
        );

        $writer = new PngWriter();

        $result = $writer->write($qrCode);

        $result->saveToFile(public_path($filename));
        return view("user.ticket", [
            'movie'=>$movie,
            'start'=>$start,
            'hall' => $hall,
            "seats" => $seats,
            "qrcode"=>$filename,
        ]);
    }
}
