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

    appointmentList.appendChild(appointment);
  });
}
submitBtn.addEventListener("click", haddleForm);
renderItemsToPage();
