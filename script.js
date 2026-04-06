// ================= DATA =================
const data = {
    cleanliness: ["Garbage issue", "Dirty washrooms", "Classroom cleaning", "Hostel cleaning"],
    discipline: ["Ragging", "Noise disturbance", "Late attendance"],
    sports: ["Ground maintenance", "Equipment issue", "Team selection"],
    event: ["Event scheduling", "Management issue", "Participation issue"],
    subject: ["Faculty issue", "Syllabus doubt", "Exam problem"],
    wifi: ["Slow internet", "No connectivity", "Login issue"],
    other: [] // 🔥 empty because user will type
};

const locations = {
    cleanliness: ["Hostel", "Tech Department", "Law Department", "IBS Department","ISPS Department","ISLA Department"],
    discipline: ["Classroom", "Ground", "Mess", "Library"],
    sports: ["Playground", "Gym", "Sports Complex"],
    event: ["Auditorium", "Seminar Hall", "Open Ground"],
    subject: ["Classroom", "Lab", "Library"],
    wifi: ["Hostel", "Campus Area", "Library"],
    other: ["Campus", "Hostel", "Other"]
};

const extraOptions = {
    "Dirty washrooms": ["Boys", "Girls"],
    "Hostel cleaning": ["Boys Hostel", "Girls Hostel"]
};

// ================= ELEMENTS =================
const mainSelect = document.getElementById("entry-select");
const subSelect = document.getElementById("sub-entry");
const locationSelect = document.getElementById("location");
const extraBox = document.getElementById("extra-box");
const extraSelect = document.getElementById("extra");

const otherBox = document.getElementById("otherBox");
const otherInput = document.getElementById("otherInput");

const descriptionBox = document.getElementById("description");

// ================= FIRST DROPDOWN =================
mainSelect.addEventListener("change", function () {
    const selectedValue = this.value;

    // Reset sub dropdown
    subSelect.innerHTML = '<option disabled selected>-- Select specific issue --</option>';

    // 🔥 HANDLE OTHER
    if (selectedValue === "other") {
    otherBox.style.display = "block";

    // 🔥 AUTO FOCUS + SCROLL
    descriptionBox.focus();
    descriptionBox.scrollIntoView({ behavior: "smooth" });

    // OPTIONAL TEXT
    descriptionBox.value = "Other issue: ";

} else {
    otherBox.style.display = "none";
    otherInput.value = "";
}

    // Fill sub dropdown
    if (data[selectedValue]) {
        data[selectedValue].forEach(function (item) {
            let option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            subSelect.appendChild(option);
        });
    }

    // Reset lower fields
    locationSelect.innerHTML = '<option disabled selected>-- Select issue first --</option>';
    extraBox.style.display = "none";
});

// ================= OTHER INPUT =================
otherInput.addEventListener("input", function () {
    descriptionBox.value = this.value;
});

// ================= SECOND DROPDOWN =================
subSelect.addEventListener("change", function () {
    const mainValue = mainSelect.value;
    const subValue = this.value;

    // Auto-fill description (optional)
    if (mainValue !== "other") {
        descriptionBox.value = subValue;
    }

    // Load locations
    locationSelect.innerHTML = '<option disabled selected>-- Select location --</option>';
    if (locations[mainValue]) {
        locations[mainValue].forEach(function (place) {
            let option = document.createElement("option");
            option.value = place;
            option.textContent = place;
            locationSelect.appendChild(option);
        });
    }

    // Extra options
    if (extraOptions[subValue]) {
        extraBox.style.display = "block";
        extraSelect.innerHTML = '<option disabled selected>-- Select an option --</option>';

        extraOptions[subValue].forEach(function (item) {
            let option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            extraSelect.appendChild(option);
        });
    } else {
        extraBox.style.display = "none";
    }
});

// ================= SUBMIT =================
function submitComplaint() {

    let problem = mainSelect.value;
    let description = descriptionBox.value;
    let anonymous = document.getElementById("anonymous").checked;

    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    let complaint = {
        problem,
        description,
        anonymous,
        status: "pending",
        user: anonymous ? "Anonymous" : user.name
    };

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.push(complaint);

    localStorage.setItem("complaints", JSON.stringify(complaints));

    alert("Complaint submitted!");
}

// ================= ANONYMOUS =================
const anonymousBox = document.getElementById("anonymous");
const msg = document.getElementById("anon-msg");

if (anonymousBox) {
    anonymousBox.addEventListener("change", function () {
        msg.style.display = this.checked ? "block" : "none";
    });
}