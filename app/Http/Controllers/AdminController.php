<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Property;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function profile()
    {
        if (Auth::check()) {
            $adminData = Auth::user();
            $properties = Property::with('images')->get(); // Eager load images

            return Inertia::render('Darek/admin_profile', [
                'adminData' => $adminData,
                'properties' => $properties
            ]);
        } else {
            return redirect()->route('login');
        }
    }
}
