const d = document,
// API_URL = `https://localhos:3000/membership`;

//https://api.escuelajs.co/api/v1/products
//https://dummyjson.com/users
//https://fakestoreapi.com/products
//https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8
// API_URL = `https://jsonplaceholder.typicode.com/photos`;
API_URL = `https://apicharlotte.up.railway.app/membership`;


let student = [];
 const getStudentData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
      student = json;
      console.log(student);
 


      /*  renderStudentData(student); */
      
    } catch (err) {
        /*  const table = d.querySelector(".crud-table-student");
        table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`; */
    }
};



d.addEventListener("DOMContentLoaded", (e) => {
    getStudentData();
  });