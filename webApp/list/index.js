
const users = await fetch('http://localhost:8000/employees')
.then((response) => response.json())
.then((data) => {
  return data.rows;
});
  
const tableBody = document.getElementById("tableBody");

console.log(users)

users.forEach((user) => {
  tableBody.innerHTML += `<tr><td> ${user.name} </td> <td> ${user.age} </td><td> ${user.gender} </td></tr>`;
})
