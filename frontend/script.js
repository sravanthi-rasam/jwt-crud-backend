function login(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
            console.log("JWT Token:", data.token); // 👈 ADD THIS
          localStorage.setItem("token", data.token);
          document.getElementById("message").innerText = "Login successful";
          document.getElementById("message").style.color = "green";
        } else {
          document.getElementById("message").innerText = "Invalid credentials";
          document.getElementById("message").style.color = "red";
        }
      })
      .catch(err => {
        console.error(err);
        document.getElementById("message").innerText = "Server error";
      });
  }
  