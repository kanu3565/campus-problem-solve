// REGISTER
function register() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let role = document.getElementById("role").value;

    // EMPTY CHECK
    if (!name || !email || !phone || !password || !confirmPassword) {
        alert("Please fill all fields!");
        return;
    }

    // PASSWORD MATCH CHECK
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // CHECK IF USER EXISTS
    const exists = users.find(u => u.email === email);
    if (exists) {
        alert("User already exists!");
        return;
    }

    let user = { name, email, phone, password, role };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "login.html";
}


// LOGIN
function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        if (user.role === "student") {
            window.location.href = "student-dashboard.html";
        } else {
            window.location.href = "faculty-dashboard.html";
        }

    } else {
        alert("Invalid Login!");
    }
}


// ROLE SELECT
function selectRole(role, element) {
    document.getElementById("role").value = role;

    document.querySelectorAll(".role-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    element.classList.add("active");
}


// PASSWORD LIVE CHECK (OPTIONAL)
document.addEventListener("DOMContentLoaded", function () {
    let confirmInput = document.getElementById("confirmPassword");

    if (confirmInput) {
        confirmInput.addEventListener("input", function () {
            let pass = document.getElementById("password").value;
            let confirm = this.value;
            let error = document.getElementById("passError");

            if (pass !== confirm) {
                error.style.display = "block";
            } else {
                error.style.display = "none";
            }
        });
    }
});


// DASHBOARD DATA LOAD
window.onload = function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) return;

    if (document.getElementById("studentName")) {
        document.getElementById("studentName").innerText = "Name: " + user.name;
        document.getElementById("studentEmail").innerText = "Email: " + user.email;
    }

    if (document.getElementById("facultyComplaints")) {
        document.getElementById("facultyComplaints").innerHTML =
            "<p>No complaints assigned yet</p>";
    }
};