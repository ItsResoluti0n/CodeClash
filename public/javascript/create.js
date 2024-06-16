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