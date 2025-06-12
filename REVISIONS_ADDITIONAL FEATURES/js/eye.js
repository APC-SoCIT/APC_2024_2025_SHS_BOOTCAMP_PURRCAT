//for login.php, signup.php, passenger_interface, information.php, and passenger_interface/gps.html
// for eye icon to switch from open to closed one
// signup and login html javascript
function togglePassword(inputId) {
  const passwordInput = document.getElementById(inputId);
  const eyeIcon = passwordInput.nextElementSibling.querySelector(".eye-icon");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.src = "../images/eye_pressed.png";
  } else {
    passwordInput.type = "password";
    eyeIcon.src = "../images/eye.png";
  }
}