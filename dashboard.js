// Load user data
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}


document.getElementById("userName").textContent = user?.name || "N/A";
document.getElementById("userEmail").textContent = user?.email || "N/A";

// Load complaints
const complaints = JSON.parse(localStorage.getItem("complaints")) || [];

const complaintList = document.getElementById("complaintList");


function displayComplaints() {
    complaintList.innerHTML = "";

    complaints.forEach((c, index) => {
        let div = document.createElement("div");
        div.className = "complaint-item";

        div.innerHTML = `
    <p><b>Category:</b> ${c.category}</p>
    <p><b>Issue:</b> ${c.issue}</p>
    <p><b>Description:</b> ${c.description}</p>
    <p><b>By:</b> ${c.anonymous ? "Anonymous" : "You"}</p>

    <div class="complaint-actions">
        <button class="edit-btn" onclick="editComplaint(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteComplaint(${index})">Delete</button>
    </div>
`;

        complaintList.appendChild(div);
    });
}

// Delete
function deleteComplaint(index) {
    complaints.splice(index, 1);
    localStorage.setItem("complaints", JSON.stringify(complaints));
    displayComplaints();
}

// Edit (basic)
function editComplaint(index) {
    let newDesc = prompt("Edit your complaint:", complaints[index].description);
    if (newDesc) {
        complaints[index].description = newDesc;
        localStorage.setItem("complaints", JSON.stringify(complaints));
        displayComplaints();
    }
}

// Logout
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

// Load on start
displayComplaints();
