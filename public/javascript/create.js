//makes the password field active/not active depending on checkbox status
const passActivate = () => {
    const check = document.getElementById("private-check");
    const input = document.getElementById("password-input");
    const label = document.getElementById("passw-label");
    if (!check.checked) {
        input.readOnly = true
        input.classList.add("input-disabled")
        label.classList.add("label-disabled")
    } else {
        input.readOnly = false
        input.classList.remove("input-disabled")
        label.classList.remove("label-disabled")
    }
}

//creates a room based on the given inputs
const createRoom = () => {
    const name = document.getElementById("room-input").value;
    const password = document.getElementById("password-input").value;
    const private = document.getElementById("private-check").checked;
    if(!private) {
        password = null
    }
    //data to be sent to server
    const data = {
        roomName: name,
        password: password
    };
    fetch("http://localhost:3000/room-create", {    //Webpage URL
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
        //The data being sent converted from JavaScript value to JSON format
        body: JSON.stringify(data)
    })
}