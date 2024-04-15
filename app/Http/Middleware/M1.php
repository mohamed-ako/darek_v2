<?php

namespace App\Http\Middleware;

use Closure;

class M1
{
    public function handle($request, Closure $next)
    {
        if (strlen($request->mot) >= 10) {
            return redirect('mot')->with('error', 'Word length exceeds 10 characters.');
        }

        return $next($request);
    }
}
