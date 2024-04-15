<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CalcMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $num1 = $request->input('num1');
        $num2 = $request->input('num2');

        if (empty($num1) || empty($num2) && $request->input('opr')!=='/' ) {
            return redirect('errcalcule');
        }

        return $next($request);
    }
}
