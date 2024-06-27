const signUpFormShow = () => {
    const signUp = document.getElementById("signup");
    signUp.classList.remove("hide")
}

const signUpFormClose =() => {
    const signUp = document.getElementById("signup");
    signUp.classList = ("hide")
}

const signUpSubmit = () => {
    const name = document.getElementById("name-input");
    const password = document.getElementById("password-input");
    data = {
        username: name,
        password: password
    }
    fetch("http://localhost:3000/room-create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(
        
    )
}