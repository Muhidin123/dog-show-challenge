const form = document.querySelector("form");
const table = document.getElementById("table-body");
const name = form.firstElementChild;
const breed = form;
const sex = null;

function populateDogTable(dog) {
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.dataset.id = dog.id;
  editButton.addEventListener("click", (e) => {
    populateForm(e.target.dataset.id);
    form.dataset.dogId = e.target.dataset.id;
  });

  td1.textContent = dog.name;
  td2.textContent = dog.breed;
  td3.textContent = dog.sex;
  td4.append(editButton);

  tr.append(td1, td2, td3, td4);
  table.append(tr);
}
function initialFetch() {
  fetch("http://localhost:3000/dogs")
    .then((res) => res.json())
    .then((dogs) => {
      table.innerHTML = "";
      dogs.forEach(populateDogTable);
    });
}
form.addEventListener("submit", (e) => {
  console.log(e.target);
  e.preventDefault();
  editDog(e.target);
});

function editDog(e) {
  const body = {
    name: e.name.value,
    breed: e.breed.value,
    sex: e.sex.value,
  };

  fetch(`http://localhost:3000/dogs/${e.dataset.dogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((_) => {
      form.reset();
      initialFetch();
    });
}

function populateForm(id) {
  fetch(`http://localhost:3000/dogs/${id}`)
    .then((res) => res.json())
    .then((dog) => {
      form.name.value = dog.name;
      form.breed.value = dog.breed;
      form.sex.value = dog.sex;
    });
}

initialFetch();
