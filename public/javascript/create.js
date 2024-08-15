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

//Fetchs the data from the website
function createRoom(){
    const name = document.getElementById("room-input").value;
    const password = document.getElementById("password-input").value;
    const private = document.getElementById("private-check").checked;
    if(!private) {
        password = null
    }
    //Data to be sent
    const data = {
        roomName: name,
        password: password,
    };
    fetch("http://localhost:3000/room-create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        const result = response.result
        const id = result.insertedId
        window.location.href = "/play/" + id
    })
};