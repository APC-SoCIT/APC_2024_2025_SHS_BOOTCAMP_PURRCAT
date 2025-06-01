function togglePassword(inputId) {
  const passwordInput = document.getElementById(inputId);
  const eyeIcon = passwordInput.nextElementSibling.querySelector(".eye-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.src = "images/eye_pressed.png";
  } else {
    passwordInput.type = "password";
    eyeIcon.src = "images/eye.png";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const todayDateElement = document.getElementById("todayDate");
  if (todayDateElement) {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    todayDateElement.textContent = formattedDate;
  }

  const imHereBtn = document.getElementById("imHereBtn");
  if (imHereBtn) {
    imHereBtn.addEventListener("click", () => {
      alert("Driver has been notified that you are at the pickup location!");
    });
  }

  const waitingToggle = document.getElementById("waitingToggle");
  if (waitingToggle) {
    waitingToggle.addEventListener("change", function () {
      const toggleValue = document.querySelector(".toggle-value");
      toggleValue.textContent = this.checked ? "YES" : "NO";
    });
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        e.preventDefault();
      }
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
    });
  }
});
