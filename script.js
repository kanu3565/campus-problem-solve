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
    "Garbage issue": ["Campus", "Hostel", "Ground"],
    "Dirty washrooms": ["Boys Washroom", "Girls Washroom"],
    "Classroom cleaning": ["Classroom", "Lecture Hall"],
    "Hostel cleaning": ["Boys Hostel", "Girls Hostel"],

    "Ragging": ["Hostel", "Campus"],
    "Noise disturbance": ["Classroom", "Hostel","Library"],
    "Late attendance": ["Classroom"],

    "Ground maintenance": ["Main Ground", "Practice Ground"],
    "Equipment issue": ["Court", "Ground"],
    "Team selection": ["Sports Office"],

    "Slow internet": ["Hostel", "Library","classroom","lab"],
    "No connectivity": ["Campus Area", "Library"],
    "Login issue": ["Lab", "Library"]
};

const extraOptions = {
    "Hostel cleaning": ["Boys Hostel", "Girls Hostel"],

    "Equipment issue": ["Cricket", "Football", "Basketball","Kabaddi","Badminton","Tabletenis",],
    
    "Team selection": ["Cricket Team", "Football Team"]
};
const equipmentOptions = {
    "Cricket": ["Bat", "Ball", "Pads", "Helmet","Wickets"],
    "Football": ["Ball", "Goal Post"],
    "Basketball": ["Ball", "Ring", "Wet ground"],
    "Kabaddi": ["Linning"],
    "Badminton": ["Racket", "Shuttle","Net"],
    "Tabletenis": ["Bat", "Ball", "Table","net"]
};
const subLocations = {
    "Campus Area": ["Main Building", "Tech Building", "Workshop"],
    "Hostel": ["Block A", "Block B", "Mess", "Corridor"],
    "Library": ["Reading Hall", "Computer Section"],
    "Tech Department": ["Lab 1", "Lab 2", "Classroom's"],
    "Law Department": ["Room 101", "Room 102"],
};

// ================= ELEMENTS =================
const mainSelect = document.getElementById("entry-select");
const subSelect = document.getElementById("sub-entry");
const locationSelect = document.getElementById("location");

const extraBox = document.getElementById("extra-box");
const extraSelect = document.getElementById("extra");

const equipmentBox = document.getElementById("equipment-box");
const equipmentSelect = document.getElementById("equipment");

const subLocationBox = document.getElementById("sub-location-box");
const subLocationSelect = document.getElementById("sub-location");

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
    descriptionBox.value = "Other: " + this.value;
});

// ================= SECOND DROPDOWN =================
subSelect.addEventListener("change", function () {
    const mainValue = mainSelect.value;
    const subValue = this.value;

    // 🔥 Auto-fill description
    descriptionBox.value = subValue;
    if (subValue === "Hostel cleaning") {
    locationSelect.disabled = true;
} else {
    locationSelect.disabled = false;
}
    // 🔥 HANDLE OTHER IN SECOND DROPDOWN
if (subValue === "Other") {
    otherBox.style.display = "block";

    descriptionBox.focus();
    descriptionBox.scrollIntoView({ behavior: "smooth" });

    descriptionBox.value = "Other issue: ";
} else {
    otherBox.style.display = "none";
}


    // 🔥 LOCATION UPDATE
if (subValue === "Hostel cleaning") {
    locationSelect.innerHTML = '<option selected>Hostel</option>';
    locationSelect.disabled = true;
} else {
    locationSelect.disabled = false;

    locationSelect.innerHTML = '<option disabled selected>-- Select location --</option>';

    if (locations[subValue]) {
    locations[subValue].forEach(function (place) {
        let option = document.createElement("option");
        option.value = place;
        option.textContent = place;
        locationSelect.appendChild(option);
    });
}
}

    // 🔥 EXTRA OPTIONS (IMPORTANT PART)
    if (extraOptions[subValue]) {
        extraBox.style.display = "block";

        extraSelect.innerHTML = '<option disabled selected>-- Select more details --</option>';

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
// ================= THIRD DROPDOWN (EXTRA SELECT CHANGE) =================
extraSelect.addEventListener("change", function () {

    const selectedSport = this.value;

    // 🔥 Update description (WITHOUT equipment)
    descriptionBox.value = `${subSelect.value} - ${selectedSport}`;

    // 🔥 Show equipment if needed
    if (equipmentOptions[selectedSport]) {

        equipmentBox.style.display = "block";

        equipmentSelect.innerHTML = '<option disabled selected>-- Select equipment --</option>';

        equipmentOptions[selectedSport].forEach(function (item) {
            let option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            equipmentSelect.appendChild(option);
        });

    } else {
        equipmentBox.style.display = "none";
    }

    // 🔥 OTHER handling
    if (selectedSport === "Other") {
        otherBox.style.display = "block";
        descriptionBox.focus();
    } else {
        otherBox.style.display = "none";
    }
});
// ================= FINAL DROPDOWN (EQUIPMENT SELECT) =================
equipmentSelect.addEventListener("change", function () {

    const equipment = this.value;

    descriptionBox.value = `${subSelect.value} - ${extraSelect.value} - ${equipment}`;

    // UX improvement
    descriptionBox.focus();
    descriptionBox.scrollIntoView({ behavior: "smooth" });
});
// ================= SUB LOCATION LOGIC =================
locationSelect.addEventListener("change", function () {

    const selectedLocation = this.value;

    if (subLocations[selectedLocation]) {

        subLocationBox.style.display = "block";

        subLocationSelect.innerHTML = '<option disabled selected>-- Select specific location --</option>';

        subLocations[selectedLocation].forEach(function (place) {
            let option = document.createElement("option");
            option.value = place;
            option.textContent = place;
            subLocationSelect.appendChild(option);
        });

    } else {
        subLocationBox.style.display = "none";
    }

    // Update description
    descriptionBox.value = `${subSelect.value} - ${selectedLocation}`;
});
subLocationSelect.addEventListener("change", function () {

    const subLocation = this.value;

    descriptionBox.value = `${subSelect.value} - ${locationSelect.value} - ${subLocation}`;
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