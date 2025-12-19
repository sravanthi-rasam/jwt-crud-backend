const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "index.html";
}

// READ
function loadData() {
  fetch("http://localhost:3000/api/data", {
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("list");
      list.innerHTML = "";

      data.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${item.item}</span>
          <button onclick="deleteData(${index})">Delete</button>
        `;
        list.appendChild(li);
      });
    });
}

// CREATE
function addData() {
  const item = document.getElementById("item").value;
  if (!item) return alert("Enter item");

  fetch("http://localhost:3000/api/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ item })
  }).then(() => {
    document.getElementById("item").value = "";
    loadData();
  });
}

// DELETE
function deleteData(id) {
  if (!confirm("Are you sure?")) return;

  fetch(`http://localhost:3000/api/data/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  }).then(() => loadData());
}

loadData();
