export default function MessagesList(messagesData, IdConvers) {
    console.log("messagesData : -> ", messagesData);
    if (messagesData.messages) {
        alert("messagesData");    }
    console.log("IdConvers : => ", IdConvers);
    return (
        <h1
            style={{
                fontSize: "x-large",
                color: "darkred",
                textAlign: "center",
            }}
        >
            messages page
        </h1>
    );
}
