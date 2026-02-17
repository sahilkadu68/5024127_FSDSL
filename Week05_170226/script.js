let users = [];

// ===============================
// UTILITY FUNCTIONS
// ===============================
function showError(msg) {
    document.getElementById("message").innerHTML =
        "<span class='error'>" + msg + "</span>";
}

function showSuccess(msg) {
    document.getElementById("message").innerHTML =
        "<span class='success'>" + msg + "</span>";
}

function validateEmail(email) {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return pattern.test(email);
}

function formatName(name) {
    return name.toLowerCase().split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function getCountdown(date) {
    const now = new Date();
    const diff = date - now;

    if (diff <= 0) return "Event started";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days left`;
}

// ===============================
// MAIN LOGIC
// ===============================
function registerUser() {
    try {
        const nameInput = document.getElementById("name").value.trim();
        const emailInput = document.getElementById("email").value.trim();
        const dateInput = document.getElementById("date").value;

        // Validation
        if (!nameInput || !emailInput || !dateInput) {
            throw new Error("All fields are required");
        }

        if (!validateEmail(emailInput)) {
            throw new Error("Invalid email format");
        }

        // Duplicate email check
        if (users.some(user => user.email === emailInput)) {
            throw new Error("This email is already registered");
        }

        const eventDate = new Date(dateInput);
        const today = new Date();
        today.setHours(0,0,0,0); // safer comparison

        if (eventDate < today) {
            throw new Error("Event date must be in the future");
        }

        const user = {
            name: formatName(nameInput),
            email: emailInput,
            date: eventDate,
            registeredOn: new Date()
        };

        users.push(user);

        showSuccess("Registration successful!");
        updateUI();
        clearFields();

        // 👇 Debug success log
        console.log("User registered:", user);

    } catch (error) {
        // 👇 Console exception (IMPORTANT FOR YOUR REQUIREMENT)
        console.error("Registration Error:", error);

        // 👇 Show user-friendly message
        showError(error.message);
    }
}

// ===============================
// UI FUNCTIONS
// ===============================
function updateUI() {
    const list = document.getElementById("userList");
    const count = document.getElementById("count");

    list.innerHTML = "";
    count.innerText = users.length;

    users.forEach((user, index) => {
        const userDiv = document.createElement("div");
        userDiv.className = "user";

        userDiv.innerHTML = `
            <strong>${user.name}</strong><br>
            ${user.email}<br>
            Event: ${user.date.toDateString()}<br>
            ${getCountdown(user.date)}
            <button class="delete" onclick="deleteUser(${index})">Delete</button>
        `;

        list.appendChild(userDiv);
    });

    // 👇 Debug log
    console.log("Current users array:", users);
}

function deleteUser(index) {
    try {
        if (index < 0 || index >= users.length) {
            throw new Error("Invalid user index");
        }

        console.log("Deleting user:", users[index]);
        users.splice(index, 1);
        updateUI();

    } catch (error) {
        console.error("Delete Error:", error);
        showError(error.message);
    }
}

function clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("date").value = "";
}
