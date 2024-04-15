<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Session;


class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255', // Add validation for first_name
            'last_name' => 'required|string|max:255', // Update 'name' to 'first_name'
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'username' => 'required|string|lowercase|string|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => $request->password,
            'publisher' => 0,
            'remember_token'=>'null',
        ]);

        event(new Registered($user));

        // Auth::login($user);

        // $myemail = $request->input('email');
        // Session::put('controlleremail', $myemail);

        // return redirect(RouteServiceProvider::HOME);
        return redirect('Darek/Login');

    }
}
