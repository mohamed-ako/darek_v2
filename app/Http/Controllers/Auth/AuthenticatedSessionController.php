<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash; // Import Hash facade
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;
use Inertia\Response;
// use Inertia\Inertia;


class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {

        // Attempt to authenticate user
        if (Auth::attempt($request->only('email', 'password'))) {
            // If authentication is successful, regenerate session and redirect to intended URL
            $request->session()->regenerate();

            // Send email to the desired endpoint
            // $response = Inertia::visit('/getDarek', ['email' => $myemail]);
            // return redirect()->route('getDarek', ['email' => $myemail]);
            $myemail = $request->input('email');
            // Store email in the session
            Session::put('controlleremail', $myemail);
            // Log the email
            \Log::info('controlleremail :', ['email' => $myemail]);
    

            return redirect()->intended(RouteServiceProvider::HOME);
        }

        // If authentication fails, redirect back to login page with error message
        return redirect()->back()->withErrors([
            'email' => 'These credentials do not match our records.',
        ]);
    
        
        // $myemail = $request->input('email');
        // Session::put('controlleremail', $myemail);
        // \Log::info('controlleremail :', ['email' => $myemail]);   

        // // Attempt to authenticate user
        // if (Auth::attempt($request->only('email', 'password'))) {
        //     $request->session()->regenerate();
        //     return redirect()->intended(RouteServiceProvider::HOME);
        // }

        // // Authentication failed
        // return redirect('Darek/Login')->withErrors([
        //     'email' => 'These credentials do not match our records.',
        // ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        // return redirect()->intended(RouteServiceProvider::HOME);

        // return redirect('Home');

        // return route('Darek/Login');
        return redirect('Login');

    }
}
