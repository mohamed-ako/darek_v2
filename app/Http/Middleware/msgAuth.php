<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Session;


class msgAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $adminUserId = Session::get('adminUserId');

        if (!isset($adminUserId)) {
            return redirect('/Login')->with('error', 'Word length exceeds 10 characters.');
        }
// return redirect('/AppMessage');
        return $next($request);
    }
}
