// Day 1: Test JS Connection
console.log("Portfolio script loaded!");

// --------------------
// Select Elements
// --------------------

const toggleBtn = document.getElementById("theme-toggle");
const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const headerText = document.querySelector("header p");
const navLinks = document.querySelectorAll("nav a");

// --------------------
// Reusable Functions
// --------------------

// Show Error Message
function showError(input, message) {
    if (!input) return;

    input.style.border = "2px solid red";

    let error = input.nextElementSibling;

    if (!error || !error.classList.contains("error")) {
        error = document.createElement("small");
        error.classList.add("error");
        input.parentNode.insertBefore(error, input.nextSibling);
    }

    error.textContent = message;
    error.style.color = "red";
}

// Clear Error Message
function clearError(input) {
    if (!input) return;

    input.style.border = "1px solid #ccc";

    let error = input.nextElementSibling;

    if (error && error.classList.contains("error")) {
        error.remove();
    }
}

// Validate Email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --------------------
// Dark Mode Toggle
// --------------------

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            toggleBtn.textContent = "☀ Light Mode";
            localStorage.setItem("theme", "dark");
        } else {
            toggleBtn.textContent = "🌙 Dark Mode";
            localStorage.setItem("theme", "light");
        }
    });
}

// Load saved theme
window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");

        if (toggleBtn) {
            toggleBtn.textContent = "☀ Light Mode";
        }
    }
});

// --------------------
// Form Validation
// --------------------

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let valid = true;

        // Name validation
        if (!nameInput.value.trim()) {
            showError(nameInput, "Name is required");
            valid = false;
        } else {
            clearError(nameInput);
        }

        // Email validation
        if (!emailInput.value.trim()) {
            showError(emailInput, "Email is required");
            valid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, "Enter a valid email");
            valid = false;
        } else {
            clearError(emailInput);
        }

        // Message validation
        if (!messageInput.value.trim()) {
            showError(messageInput, "Message is required");
            valid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, "Message must be at least 10 characters");
            valid = false;
        } else {
            clearError(messageInput);
        }

        // If valid
        if (valid) {
            alert("Message sent successfully!");
            form.reset();
        }
    });
}

// --------------------
// Real-time Validation
// --------------------

if (nameInput) {
    nameInput.addEventListener("input", () => {
        clearError(nameInput);
    });
}

if (emailInput) {
    emailInput.addEventListener("input", () => {
        clearError(emailInput);
    });
}

if (messageInput) {
    messageInput.addEventListener("input", () => {
        clearError(messageInput);
    });
}

// --------------------
// Smooth Scroll Navigation
// --------------------

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// --------------------
// Typing Effect
// --------------------

const textArray = [
    "Web Developer",
    "React Learner",
    "Future Full Stack Developer"
];

let textIndex = 0;
let charIndex = 0;

function typeEffect() {
    if (!headerText) return;

    if (charIndex === 0) {
        headerText.textContent = "";
    }

    if (charIndex < textArray[textIndex].length) {
        headerText.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;

        setTimeout(typeEffect, 100);
    } else {
        setTimeout(() => {
            charIndex = 0;
            textIndex = (textIndex + 1) % textArray.length;
            typeEffect();
        }, 1500);
    }
}

// Start typing effect
typeEffect();