<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Darek Project : -------------------------------------------------------------------------

// i use register and login and logout and forget-password and rest-password in routes/auth.php 

use Inertia\Inertia;
use App\Http\Middleware\AuthDarek;
use App\Http\Controllers\DarekProfile;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DarekHome;

Route::get('Darek/Profile', [DarekProfile::class, 'home'])->name('myprofile')->middleware('AuthDarek');
Route::post('Darek/Profile', [DarekProfile::class, 'home'])->name('getDarek');

// Route::post('getDarek', [DarekProfile::class, 'home'])->name("getDarek");
// Route::get('getDarek', [DarekProfile::class, 'home'])->name("getDarek");
    Route::get('user_update', [DarekProfile::class, 'update']);
    // Route::get('Darek/SearchInfo', [DarekHome::class, 'search']);


// Route::get('Darek/SearchInfo', [DarekHome::class, 'search'])->name('DarekSearchInfo'); 
// Route::post('Darek/Search', [DarekHome::class, 'search'])->name('DarekSearch'); // Handle search functionality

Route::get('Darek/Login', function () {
    return Inertia::render('Darek/Login');
})->name('dareklogin');
Route::post('user_update', [DarekProfile::class, 'update']);
Route::post('delete_offer', [DarekProfile::class, 'deleteOffer']);
Route::post('delete_favoret_property', [DarekProfile::class, 'deleteFavoriteProperty']);
// Route::post('update_profile_picture/{userId}', [DarekProfile::class, 'updateProfilePicture']);
Route::post('update_profile_picture', [DarekProfile::class, 'updateProfilePicture']);



Route::get('/', function () {
    return Inertia::render('Index');
});

Route::get('/Index', function () {
    return Inertia::render('Index');
});

Route::get('Darek/Home', [DarekHome::class, 'search'])->name('DarekHome');
Route::get('/properties/search', [DarekHome::class, 'search']);


// Route::get('Darek/Home', function () {
//     return Inertia::render('Darek/Home')->name("DarekHome");
// });
Route::get('Publisher', function () {
    return Inertia::render('Darek/Publisher');
});
Route::get('Logout', function () {
    return Inertia::render('Darek/Logout');
});
Route::get('NavBar', function () {
    return Inertia::render('Darek/NavBar');
});
Route::get('admin/profile', [AdminController::class, 'profile']);


// Route::get('SearchInfo', function () {
//     return Inertia::render('Darek/SearchInfo');
// })->name('DarekSearchInfo');


Route::get('AppMessage', function () {
    return Inertia::render('Darek/AppMessage');
})->name('DarekSearchInfo');

Route::get('InfoPrperty', function () {
    return Inertia::render('Darek/InfoPrperty');
})->name('InfoPrperty');
// 
Route::post('properties/search', [DarekHome::class, 'search']);
Route::post('MessageToUser', [DarekHome::class, 'addMessage']);
Route::post('MessageTest', [DarekHome::class, 'myMessage']);
Route::get('GetMessage', [DarekHome::class, 'getAllMessage']);
Route::get('AppMessage', [DarekHome::class, 'getMessage']);
Route::post('GetAllMessage', [DarekHome::class, 'getMessage']);
// Route::post('GetAllMessage', [DarekHome::class, 'getAllMessage']);





// Route::get('SearchInfo', [DarekHome::class, 'search'])->name('DarekSearchInfo');



// Route::get('Darek/Home', [DarekHome::class, 'search']);

// Route::resources('Darek/Home',DarekHome::class);
// -------------------------------------------------------------------------



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::get('/users', function () {
    return Inertia::render('Users/Index', [
        'name' => 'Dan',
        'company' => 'Coding with Pixel Fix',
    ]);
});

















// use App\Http\Controllers\MotController;
// Route::get('/mot', [MotController::class, 'home']);
// Route::get('Controle1/Affichage', [MotController::class, 'affichage'])->name('affichage')->middleware('M1','M2','M2');



require __DIR__.'/auth.php';
