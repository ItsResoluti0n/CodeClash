const signUpFormShow = () => {
    const signUp = document.getElementById("signup");
    signUp.classList.remove("hide")
}

const signUpFormClose =() => {
    const signUp = document.getElementById("signup");
    signUp.classList = ("hide")
}

const signUpSubmit = () => {
    const name = document.getElementById("name-input").value;
    const password = document.getElementById("password-input").value;
    data = {
        username: name,
        password: password
    }
    signUpFormClose();
    fetch("http://localhost:3000/make-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
    .then(response => {
        const result = response.result
        localStorage.setItem("userID", result.insertedId)
        detailsFill()
    })
}

const ifLoggedIn = () => {
    if (localStorage.getItem("userID") != null ) {
        detailsFill()
    }
}

const detailsFill = () => {
    const userID = localStorage.getItem("userID")
    console.log(userID)
    data = {
        userID: userID
    }
    fetch("http://localhost:3000/get-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
    .then(response => {
        const result = response.result

        console.log(result)

        const accountNameTag = document.getElementById("account-name");
        const name = result.username

        const button1 = document.getElementById("button1")
        const button2 = document.getElementById("button2")

        button1.innerHTML = "Edit Name"
        button2.innerHTML = "Log out"
        button2.removeEventListener('click',signUpFormShow)
        button2.addEventListener('cli‌​ck',logOut)

        document.getElementById("button2").onclick = logOut

        accountNameTag.innerHTML = name
    })
}

const logOut = () => {
        localStorage.removeItem("userID");

        const accountNameTag = document.getElementById("account-name");
        const name = "Account"

        const button1 = document.getElementById("button1")
        const button2 = document.getElementById("button2")

        button1.innerHTML = "Log in"
        button2.innerHTML = "Sign Up"

        accountNameTag.innerHTML = name
        button2.removeEventListener('click', logOut)
        button2.addEventListener('cli‌​ck', signUpFormShow)
}