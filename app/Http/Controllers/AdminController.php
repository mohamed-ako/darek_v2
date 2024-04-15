<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function profile()
    {
  
        if (Auth::check()) {
            $id = Auth::user()->id;
            $adminData = User::find($id);
            return inertia('Darek/admin_profile',  ['adminData' => $adminData]);
        } else {
          
            return redirect()->route('login');
        }
    }
}
