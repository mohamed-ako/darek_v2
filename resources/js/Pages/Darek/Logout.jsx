import React from "react";
import { Inertia } from '@inertiajs/inertia';


export default function Logout() {
    
        Inertia.post('/logout'); // Assuming you have a route to handle logout
    
    return(
        <div>

            <h1> I'm page Logout</h1>
        </div>
    )
}