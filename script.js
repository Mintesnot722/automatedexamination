"use strict";
let users = JSON.parse(localStorage.getItem("users")) || [];


// features from register.htmll
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = this.username.value.trim();
    const password = this.password.value.trim();
    const confirmPassword = this.confirmPassword.value.trim();

    // user validation
    if (username.length < 3) {
      alert("Username too short");
      return;
    }

    if (password.length < 6) {
      alert("Password is too short");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // checking if the user exists
    const exists = users.find((u) => u.username === username);

    if (exists) {
      alert("Username already exists");
      return;
    }

    // simple encoding (not real security)

    const passwordHash = btoa(password);

    users.push({
      id: Date.now(),
      username,
      password: passwordHash,
      role: "user",
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully! Redirecting...");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  });
}
users.push({
  id: Date.now(),
  username: "admin",
  password: btoa("123456"),
  role: "admin",
});

localStorage.setItem("users", JSON.stringify(users));

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const adminItems = document.querySelectorAll(".admin-only");

if (!currentUser || currentUser.role !== "admin") {
  adminItems.forEach((item) => {
    item.style.display = "none";
  });
}

//  features from login.html

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = this.username.value.trim();
    const password = this.password.value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const encodedPassword = btoa(password);

    const validUser = users.find(
      (u) => u.username === username && u.password === encodedPassword,
    );

    if (!validUser) {
      alert("Invalid username or password");
      return;
    }

    // store logged-in user
    localStorage.setItem("currentUser", JSON.stringify(validUser));

    window.location.href = "home.html";
  });
}

//  currentuser appearance on homepage and sidebar

const welcome = document.getElementById("welcome");
const role = document.getElementById("role");

if (welcome && role) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    window.location.href = "login.html";
  } else {
    welcome.textContent = `welcome to autonomous examination, ${user.username}`;
    role.textContent = `logged in as, ${user.username}`;
  }
}


  //  logout 

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });
}

const menubtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

if (menubtn && sidebar) {
  menubtn.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
  });
}
