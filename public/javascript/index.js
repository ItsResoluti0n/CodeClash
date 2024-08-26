const signUpFormShow = () => {
    const signUp = document.getElementById("signup");
    signUp.classList.remove("hide")
    document.getElementById("sign-up-title").innerHTML = "Sign Up"
    document.getElementById("finish-button").onclick = signUpSubmit
    document.getElementById("name-input").value = ""
    document.getElementById("password-input").value = ""
}

const signUpFormClose =() => {
    const signUp = document.getElementById("signup");
    signUp.classList = ("hide")
}

const logInFormShow = () => {
    const signUp = document.getElementById("signup");
    signUp.classList.remove("hide")
    document.getElementById("sign-up-title").innerHTML = "Log In"
    document.getElementById("finish-button").onclick = logInSubmit
    document.getElementById("name-input").value = ""
    document.getElementById("password-input").value = ""
}

const logInFormClose = () => {
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
        localStorage.setItem("userId", result.insertedId)
        detailsFill()
    })
}

const ifLoggedIn = () => {
    if (localStorage.getItem("userId") != null ) {
        detailsFill()
    }
}

const detailsFill = () => {
    const userId = localStorage.getItem("userId")
    data = {
        userID: userId
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

        const accountNameTag = document.getElementById("account-name");
        const name = result._id

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
        localStorage.removeItem("userId");

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

const logInSubmit = () => {
    const userId = document.getElementById("name-input").value
    const password = document.getElementById("password-input").value
    data = {
        userID: userId,
        password: password
    }
    fetch("http://localhost:3000/log-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
    .then(response => {
        const result = response.result

        if (result == null){
            alert("Invalid username or password")
        } else {
            localStorage.setItem("userId", result._id)
            detailsFill()
            logInFormClose()
        }
    })
}