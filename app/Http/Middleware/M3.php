<?php

namespace App\Http\Middleware;

use Closure;

class M3
{
    public function handle($request, Closure $next)
    {
        if (strpos($request->mot, '..') !== false) {
            return redirect('mot')->with('error', 'Consecutive periods are not allowed.');
        }

        return $next($request);
    }
}
