<?php
// app/Http/Middleware/CalcMiddleware2.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CalcMiddleware2
{
    public function handle(Request $request, Closure $next)
    {
        $num1 = $request->input('num1');
        $num2 = $request->input('num2');
        $opr = $request->input('opr');

        if ($opr === '/' && $num2 == 0) {
            return redirect('errcalcule2');
        }

        return $next($request);
    }
}

