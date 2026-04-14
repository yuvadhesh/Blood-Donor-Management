// Login Page
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Dummy credentials
        if (username == "yuva" && password == "12345") {
            localStorage.setItem("loggedIn", true);
            window.location.href = "homepage.html";
        } else {
            document.getElementById("errorMsg").innerText = "Invalid username or password!";
        }
    });
}
const donorForm = document.getElementById("donorForm");
if (donorForm) {
    donorForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const donor = {
            name: document.getElementById("donorName").value,
            age: document.getElementById("donorAge").value,
            parentName: document.getElementById("parentName").value,
            mobile: document.getElementById("mobile").value,
            address: document.getElementById("address").value,
            bloodGroup: document.getElementById("bloodGroup").value
        };

        let donors = JSON.parse(localStorage.getItem("donors") || "[]");
        donors.push(donor);
        localStorage.setItem("donors", JSON.stringify(donors));

        document.getElementById("successMsg").innerText = "Donor added successfully!";
        donorForm.reset();
    });
}

// Donor Dashboard Page
const donorTableBody = document.getElementById("donorTableBody");
if (donorTableBody) {
    const donors = JSON.parse(localStorage.getItem("donors") || "[]");
    donors.forEach(d => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${d.name}</td>
            <td>${d.age}</td>
            <td>${d.parentName}</td>
            <td>${d.mobile}</td>
            <td>${d.address}</td>
            <td>${d.bloodGroup}</td>
        `;
        donorTableBody.appendChild(tr);
    });
}
// Donor Dashboard Page
const donor = document.getElementById("donorTableBody");
const searchInput = document.getElementById("searchInput");

function renderDonors(filter = "") {
    donorTableBody.innerHTML = ""; // clear table
    const donors = JSON.parse(localStorage.getItem("donors") || "[]");
    donors
        .filter(d => {
            const searchText = filter.toLowerCase();
            return (
                d.name.toLowerCase().includes(searchText) ||
                d.bloodGroup.toLowerCase().includes(searchText) ||
                d.mobile.includes(searchText)
            );
        })
        .forEach(d => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${d.name}</td>
                <td>${d.age}</td>
                <td>${d.parentName}</td>
                <td>${d.mobile}</td>
                <td>${d.address}</td>
                <td>${d.bloodGroup}</td>
            `;
            donorTableBody.appendChild(tr);
        });
}

// Initial render
if (donorTableBody) renderDonors();

// Real-time search event
if (searchInput) {
    searchInput.addEventListener("input", () => {
        renderDonors(searchInput.value);
    });
}
// Logout functionality
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedIn"); // remove login flag
        window.location.href = "index.html"; // redirect to login page
    });
}

// Optional: Protect pages from unauthorized access
if (window.location.pathname.includes("home.html") || window.location.pathname.includes("donors.html")) {
    if (!localStorage.getItem("loggedIn")) {
        window.location.href = "index.html";
    }
}

