// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// Contact form
const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("statusMsg");
const submitBtn = document.getElementById("submitBtn");

if (form) {
    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            showMessage("Please fill all fields!", "error");
            return;
        }

        // Button loading state
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        try {
            const response = await fetch("http://127.0.0.1:3000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, message })
            });

            const result = await response.text();

            showMessage(result, "success");
            form.reset();

        } catch (error) {
            showMessage("Server error! Try again later.", "error");
        }

        // Reset button
        submitBtn.innerText = "Send Message";
        submitBtn.disabled = false;
    });
}


// Show message function
function showMessage(message, type) {
    statusMsg.innerText = message;
    statusMsg.style.display = "block";

    if (type === "success") {
        statusMsg.style.color = "#00ffae";
    } else {
        statusMsg.style.color = "#ff4d4d";
    }

    setTimeout(() => {
        statusMsg.style.display = "none";
    }, 3000);
}