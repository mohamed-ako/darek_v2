import React from "react";
import PropertyComponent from "./PropertyComponent";

export default function Home({ Property }) {
    console.log("HOME : => " + Property);

    return (
        <div>
            <h1>About Home</h1>
            {/* {Property.data.map((property, index) => ( */}
            <PropertyComponent Property={Property} />
            {/* ))} */}
        </div>
    );
}
