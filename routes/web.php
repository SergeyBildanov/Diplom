<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\HallController;

Route::get('/login', ["as"=>"login", function () {
    return view('admin.login');
}]);

Auth::routes();

//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/admin', [AdminController::class, "index"])->middleware("auth");
Route::get('/', function () {
    return view('user.index');
});

Route::get('/register', [RegisterController::class, "create"])->name("register");
Route::post('/register', [RegisterController::class, "store"]);
Route::post('/halls', [HallController::class, "store"]);