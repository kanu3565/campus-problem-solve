//  DATA FOR SECOND DROPDOWN
const data = {
    cleanliness: ["Garbage issue", "Dirty washrooms", "Classroom cleaning", "Hostel cleaning"],
    discipline: ["Ragging", "Noise disturbance", "Late attendance"],
    sports: ["Ground maintenance", "Equipment issue", "Team selection"],
    event: ["Event scheduling", "Management issue", "Participation issue"],
    subject: ["Faculty issue", "Syllabus doubt", "Exam problem"],
    wifi: ["Slow internet", "No connectivity", "Login issue"],
    other: ["General complaint", "Anonymous complaint"]
};

//  LOCATION DATA
const locations = {
    cleanliness: ["Hostel", "Tech Department", "Law Department", "IBS Department","ISPS Department","ISLA Department"],
    discipline: ["Classroom", "Ground", "Mess", "Library"],
    sports: ["Playground", "Gym", "Sports Complex"],
    event: ["Auditorium", "Seminar Hall", "Open Ground"],
    subject: ["Classroom", "Lab", "Library"],
    wifi: ["Hostel", "Campus Area", "Library"],
    other: ["Campus", "Hostel", "Other"]
};

//  EXTRA OPTIONS
const extraOptions = {
    "Dirty washrooms": ["Boys", "Girls"],
    "Hostel cleaning": ["Boys Hostel", "Girls Hostel"]
};

//  GET ELEMENTS (ONLY ONCE)
const mainSelect = document.getElementById("entry-select");
const subSelect = document.getElementById("sub-entry");
const locationSelect = document.getElementById("location");
const extraBox = document.getElementById("extra-box");
const extraSelect = document.getElementById("extra");

//  FIRST DROPDOWN CHANGE
mainSelect.addEventListener("change", function () {
    const selectedValue = this.value;

    // Reset sub dropdown
    subSelect.innerHTML = '<option disabled selected>-- Select specific issue --</option>';

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

//  SECOND DROPDOWN CHANGE
subSelect.addEventListener("change", function () {
    const mainValue = mainSelect.value;
    const subValue = this.value;

    //  Load locations
    locationSelect.innerHTML = '<option disabled selected>-- Select location --</option>';
    if (locations[mainValue]) {
        locations[mainValue].forEach(function (place) {
            let option = document.createElement("option");
            option.value = place;
            option.textContent = place;
            locationSelect.appendChild(option);
        });
    }

    //  Extra options (conditional)
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
function submitComplaint() {

    let problem = document.getElementById("entry-select").value;
    let description = document.getElementById("description").value;
    let anonymous = document.getElementById("anonymous").checked;

    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    let complaint = {
        problem,
        description,
        anonymous,
        status: "pending",   // 🔥 default
        user: anonymous ? "Anonymous" : user.name
    };

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.push(complaint);

    localStorage.setItem("complaints", JSON.stringify(complaints));

    alert("Complaint submitted!");
}
const anonymousBox = document.getElementById("anonymous");
const msg = document.getElementById("anon-msg");

if (anonymousBox) {
    anonymousBox.addEventListener("change", function() {
        if (this.checked) {
            msg.style.display = "block";
        } else {
            msg.style.display = "none";
        }
    });
}
