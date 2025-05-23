// Toggle password visibility
function togglePassword(inputId) {
  const passwordInput = document.getElementById(inputId);
  const eyeIcon = passwordInput.nextElementSibling.querySelector(".eye-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.src = "images/eye_pressed.png"; // closed eye
  } else {
    passwordInput.type = "password";
    eyeIcon.src = "images/eye.png"; // open eye
  }
}


// Format today's date
document.addEventListener("DOMContentLoaded", () => {
  const todayDateElement = document.getElementById("todayDate")
  if (todayDateElement) {
    const today = new Date()
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    todayDateElement.textContent = formattedDate
  }

  // Handle "I'm here" button
  const imHereBtn = document.getElementById("imHereBtn")
  if (imHereBtn) {
    imHereBtn.addEventListener("click", () => {
      alert("Driver has been notified that you are at the pickup location!")
    })
  }

  // Handle waiting toggle
  const waitingToggle = document.getElementById("waitingToggle")
  if (waitingToggle) {
    waitingToggle.addEventListener("change", function () {
      const toggleValue = document.querySelector(".toggle-value")
      if (this.checked) {
        toggleValue.textContent = "YES"
      } else {
        toggleValue.textContent = "NO"
      }
    })
  }

  // Form validation
  const signupForm = document.getElementById("signupForm")
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirmPassword").value

      if (password !== confirmPassword) {
        alert("Passwords do not match!")
        return
      }

      // Simulate form submission
      window.location.href = "home.html"
    })
  }

  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Simulate form submission
      window.location.href = "loading.html"
    })
  }
})
