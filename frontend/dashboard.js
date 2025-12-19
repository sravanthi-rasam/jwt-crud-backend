const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "index.html";
}

// READ
function fetchData() {
  fetch("http://localhost:3000/api/data", {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("dataList");
      list.innerHTML = "";

      data.forEach(item => {
        list.innerHTML += `
          <li>
            ${item.name} - ₹${item.price}
            <button onclick="deleteItem('${item._id}')">Delete</button>
          </li>
        `;
      });
    });
}

// CREATE
function addItem() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;

  fetch("http://localhost:3000/api/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ name, price })
  }).then(() => {
    fetchData();
  });
}

// DELETE
function deleteItem(id) {
  fetch(`http://localhost:3000/api/data/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + token
    }
  }).then(() => {
    fetchData();
  });
}

fetchData();
