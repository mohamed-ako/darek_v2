
export default function PropertyComponent({ Property}) {
    console.log("PAGE PropertyComponent", Property);
    return (
        <div className="property">
            {Object.keys(Property).map((propertyId, index) => (
                <div className="myfavorite" key={index}>
                    <main className="text-container">
                        <section>
                            <h4>{Property[propertyId].payment_type}</h4>
                            <p>City: {Property[propertyId].city}</p>
                            <p>Price: {Property[propertyId].price} DH</p>
                            <p>{Property[propertyId].property_type}</p>
                            <p>{Property[propertyId].location}</p>
                            <p>{Property[propertyId].status}</p>
                        </section>
                    </main>
                </div>
            ))}
        </div>
    );
}

