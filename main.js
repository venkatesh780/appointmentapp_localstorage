const submitBtn = document.getElementById("submit");
const updateBtn = document.getElementById("update");
const appointmentList = document.getElementById("appointment-list");

updateBtn.style.display = "none";

function getItems() {
  return JSON.parse(localStorage.getItem("appointments")) || [];
}

function addItemToArray(data) {
  let appointments = getItems();

  appointments.push(data);
  localStorage.setItem("appointments", JSON.stringify(appointments));

  renderItemsToPage();
}

function haddleForm(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;

  let data = {
    name,
    email,
    phone,
    date,
  };
  addItemToArray(data);

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("date").value = "";

  document.getElementById("name").focus();
}

function renderItemsToPage() {
  let appointemetns = getItems();

  appointmentList.innerHTML = "";

  appointemetns.forEach((item) => {
    const appointment = document.createElement("li");
    appointment.innerText = `${item.name} ${item.email} ${item.phone} ${item.date}`;

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn");
    editBtn.style.color = "orange";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("btn");
    deleteBtn.style.color = "red";

    appointment.appendChild(editBtn);
    appointment.appendChild(deleteBtn);
    appointmentList.appendChild(appointment);
  });
}

function deleteItem(itemIndex) {
  let appointments = getItems();
  appointments.splice(itemIndex, 1);

  localStorage.setItem("appointments", JSON.stringify(appointments));

  renderItemsToPage();
}

function updateItems(data, itemIndex) {
  let appointments = getItems();

  appointments[itemIndex] = data;

  localStorage.setItem("appointments", JSON.stringify(appointments));

  renderItemsToPage();

  submitBtn.style.display = "block";
  updateBtn.style.display = "none";
}
function handleEditDelete(e) {
  if (e.target.innerText === "Delete") {
    let items = e.target.parentElement.innerText.split(" ");
    let appointemetns = getItems();

    let itemIndex;
    appointemetns.forEach((item, index) => {
      if (
        items[0] === item.name &&
        items[1] === item.email &&
        items[2] === item.phone
      ) {
        itemIndex = index;
      }
    });
    deleteItem(itemIndex);
  } else if (e.target.innerText === "Edit") {
    let items = e.target.parentElement.innerText.split(" ");
    let appointemetns = getItems();

    let itemIndex;
    appointemetns.forEach((item, index) => {
      if (
        items[0] === item.name &&
        items[1] === item.email &&
        items[2] === item.phone
      ) {
        itemIndex = index;
      }
    });
    document.getElementById("name").value = items[0];
    document.getElementById("email").value = items[1];
    document.getElementById("phone").value = items[2];

    submitBtn.style.display = "none";
    updateBtn.style.display = "block";

    updateBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const date = document.getElementById("date").value;

      let data = {
        name,
        email,
        phone,
        date,
      };

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("date").value = "";
      updateItems(data, itemIndex);
    });
  }
}
submitBtn.addEventListener("click", haddleForm);
appointmentList.addEventListener("click", handleEditDelete);
renderItemsToPage();
