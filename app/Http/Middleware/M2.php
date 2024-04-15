<?php

namespace App\Http\Middleware;

use Closure;

class M2
{
    public function handle($request, Closure $next)
    {
        if (str_word_count($request->mot) > 1) {
            return redirect('/mot')->with('error', 'Please enter only one word.');
        }

        return $next($request);
    }
}
