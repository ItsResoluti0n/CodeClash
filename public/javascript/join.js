const getAvailableLobbies = () => {
    fetch("http://localhost:3000/all-rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
    .then(response => {
        const allLobbies = response.lobbies

        populateLobbies(allLobbies)
    })
}

const populateLobbies = (lobbies) => {

  const container = document.getElementById("sub-main-container");

  console.log(lobbies)

  lobbies.forEach(element => {
    const lobbyContainer = document.createElement("div");
    const roomName = document.createElement("p")
    const roomCreator = document.createElement("p")
    const joinButton = document.createElement("button")

    lobbyContainer.className = "lobby-box"
    roomName.innerHTML = element.roomName
    roomCreator.innerHTML = "Placeholder"
    joinButton.innerHTML = "Join"
    joinButton.onclick = function() {joinLobby(element)};

    lobbyContainer.appendChild(roomName);
    lobbyContainer.appendChild(roomCreator);
    lobbyContainer.appendChild(joinButton);
    container.appendChild(lobbyContainer)
  });
}

const joinLobby = (room) => {
  if(room.password != null){
    let inputPass = prompt("Enter the password");
    if (inputPass == room.password) {
      roomID = room._id
      window.location.href = "/play/" + roomID
    }
  }
  
}