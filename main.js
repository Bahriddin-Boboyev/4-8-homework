const list = document.querySelector(".list");
const forms = document.querySelector(".forms");
const inputs = document.querySelectorAll(".inputs");

const render = (data) => {
  list.innerHTML = data
    ?.map((item) => {
      return `<li class="item">
    <div class="img-block"><img src="./user-img.png" alt="img"></div>
    <p class="title">Name:<span> ${item.name}</span></p>
    <p class="username">Username:<span> ${item.username}</span></p>
    <p class="city">City:<span> ${item.address.city}</span></p>
    <p class="website">Web-Site:<span> ${item.website}</span></p>
    <div class="btn-block"><button class="deleteBtn" id="${item.id}">Delete</button>
    <button type="button" class="editBtn" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${item.id}">Edit</button></div>
    </li>`;
    })
    .join("");
};
fetch("https://jsonplaceholder.typicode.com/users", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => render(data));

list.addEventListener("click", (event) => {
  if (event.target.className.includes("deleteBtn")) {
    fetch(
      "https://jsonplaceholder.typicode.com/users" + `/${event.target.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  } else if (event.target.className.includes("editBtn")) {
    Values(event.target.id);
    forms.addEventListener("submit", (e) => {
      e.preventDefault();
      let obj = {};
      for (let i of inputs) {
        obj[i.name] = i.value;
        i.value = "";
      }
      fetch(
        "https://jsonplaceholder.typicode.com/users" + `/${event.target.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      )
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    });
  }
});

function Values(id) {
  fetch("https://jsonplaceholder.typicode.com/users" + `/${id}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i of inputs) {
        i.value = data[i.name];
        // console.log(data.address.city);
      }
    });
}
