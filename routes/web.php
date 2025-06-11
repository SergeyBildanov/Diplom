<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\HallController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\SeanceController;

Route::get('/login', ["as"=>"login", function () {
    return view('admin.login');
}]);

Auth::routes();

//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/admin', [AdminController::class, "index"])->middleware("auth")->name('admin');
Route::get('/', function () {
    return view('user.index');
});

Route::get('/register', [RegisterController::class, "create"])->name("register");
Route::get('/hall/{number}', [HallController::class, "show"]);
Route::post('/register', [RegisterController::class, "store"]);
Route::post('/hall/create', [HallController::class, "store"]);
Route::get('/halls', [HallController::class, "getAll"]);
Route::get('/movies', [MovieController::class, "index"]);
Route::get('/seances', [SeanceController::class, "getAll"]);
Route::get('/seances/{id}', [AdminController::class, "showSeance"]);
Route::get('/payment', [AdminController::class, "showPayment"]);
Route::get('/ticket', [AdminController::class, "showTicket"]);
Route::patch('/hall/update/{number}', [HallController::class, "update"]);
Route::patch('hall/patch/{number}', [HallController::class, "changeActive"]);
Route::put('/hall/update/{number}', [HallController::class, "setCosts"]);
Route::post("/movie/create", [MovieController::class, "store"]);
Route::post("/seance/create", [SeanceController::class, "store"]);
Route::get("/seance/{hall}", [SeanceController::class, "show"]);
Route::delete('/halls/delete/{number}', [HallController::class, "delete"]);
Route::delete('/seance/delete/{number}', [SeanceController::class, "delete"]);
Route::delete('/seance/delete', [SeanceController::class, "deleteAll"]);