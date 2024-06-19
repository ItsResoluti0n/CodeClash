const getLobbyDetails = () => {
    const id = localStorage.getItem("lobbyId")
    data = {id: id}
    fetch("http://localhost:3000/room-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        roomInput = document.getElementById("room-input");
        passwordInput = document.getElementById("password-input");

        roomName = response.roomName
        roomPassword = response.password
        
        roomInput.value = roomName
        passwordInput.value = roomPassword
    })
}