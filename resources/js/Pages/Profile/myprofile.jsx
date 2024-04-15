import { useState } from "react";
import './style.css';

export default function MyFavoritePr({ message, mydata , myproperty,myfvpr,images}) {

    console.log(mydata)
    console.log(myfvpr)
    console.log('images:'+images)


    
    return (
        <div>
            <h1>
                Welcome from page MyFavoritePr ayoub is gay
            </h1>
            <hr />
            <h2>{message}</h2>
            <h1>you like in {mydata.length} property that have this IDs : </h1>
            <table>
            {mydata.map((item, index) => (
                <tr key={index}>
                    <td>
                    <p>{item.property_id}</p></td>
                <hr/>

                </tr>
            ))}
</table>
<table>
    <thead>
        <tr>
            <th>Property ID</th>
            <th>City</th>
            <th>Location</th>
            <th>Status</th>
            <th>Price</th>
            <th>User ID</th>
            <th>Property Type</th>
            <th>Payment Type</th>
            <th>Images</th>
        </tr>
    </thead>
    <tbody>
  {Object.values(myfvpr).map((propertiesArray, index) => (
    propertiesArray.map((item, subIndex) => (
      <tr key={subIndex}>
        <td>{item.property_id}</td>
        <td>{item.city}</td>
        <td>{item.location}</td>
        <td>{item.status}</td>
        <td>{item.price}</td>
        <td>{item.user_id}</td>
        <td>{item.property_type}</td>
        <td>{item.payment_type}</td>
        <td>
          {images[item.property_id] && (
            <div>
              <p>Property ID: {item.property_id}</p>
              {images[item.property_id].map((image, imgIndex) => (
                <img key={imgIndex} src={image.image_link} alt={`Image ${imgIndex}`} />
              ))}
            </div>
          )}
        </td>
      </tr>
    ))
  ))}
</tbody>

</table>

<table>
<tr><th>property_id</th><th>city</th><th>location</th><th>status</th><th>price</th><th>user_id</th><th>property_type</th><th>payment_type</th></tr>
{myproperty.map((item, index) => (
                <tr key={index}>
                  
                    <td>{item.property_id}</td>
                    <td>{item.city}</td>
                    <td>{item.location}</td>
                    <td>{item.status}</td>
                    <td>{item.price}</td>
                    <td>{item.user_id}</td>
                    <td>{item.property_type}</td>
                    <td>{item.payment_type}</td>
                <hr/>

                </tr>
            ))}

</table>
        </div>
    );
}
