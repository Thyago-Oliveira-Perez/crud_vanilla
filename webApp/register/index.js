const name = document.getElementById("name");
const age = document.getElementById("age");
const gender = document.getElementById("gender");
const saveButton = document.getElementById("saveButton");

const user = {
  name: "",
  age: "",
  gender: "",
};

function onChangeInput(value) {
  user[value.target.name] = value.target.value;
}

function saveUser() {
  fetch("http://localhost:8000/new_employee", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(user),
  });
}

name.addEventListener("keyup", onChangeInput);
age.addEventListener("keyup", onChangeInput);
gender.addEventListener("keyup", onChangeInput);
saveButton.addEventListener("click", saveUser);
