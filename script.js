// Toggle password visibility
function togglePassword(inputId) {
  const passwordInput = document.getElementById(inputId)
  const eyeIcon = passwordInput.nextElementSibling.querySelector(".eye-icon")

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    eyeIcon.src = "images/eye-off.svg"
  } else {
    passwordInput.type = "password"
    eyeIcon.src = "images/eye.svg"
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
const datas = {
    'big-bus': {
        text: 'On the way to Asia Pacific College',
        image: 'images/big-bus.png'
    },
    'small-bus': {
        text: 'On the way to Lapu-Lapu',
        image: 'images/small-bus.png'
    },
    'van': {
        text: 'Currently not in use',
        image: 'images/van.png'
    }
};

// Populate List
const selectionList = document.getElementById('selectionList');
const contentDisplay = document.getElementById('contentDisplay');

Object.keys(datas).forEach((key, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'item';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'basic_carousel';
    input.id = 'radio_' + key;
    input.value = key;
    if (index === 0) input.checked = true;

    const label = document.createElement('label');
    label.setAttribute('for', 'radio_' + key);
    label.className = 'label_' + key;
    label.textContent = key.replace("-", " ").toUpperCase(); // Convert "big-bus" to "BIG BUS"

    listItem.appendChild(input);
    listItem.appendChild(label);
    selectionList.appendChild(listItem);
});

// Event Listener for Selection Change
selectionList.addEventListener('change', (event) => {
    const selectedKey = event.target.value;
    contentDisplay.innerHTML = ""; // Clear previous content

    // Create the image container
    const imageBox = document.createElement("div");
    imageBox.classList.add("image-box");

    // Create the image element
    const img = document.createElement("img");
    img.src = datas[selectedKey].image;
    img.alt = selectedKey;
    
    // Add the CSS class for styling
    img.classList.add("vehicle-image");

    // Append the image to the container
    imageBox.appendChild(img);

    // Create the text elements
    const title = document.createElement("h1");
    title.textContent = selectedKey.replace("-", " ").toUpperCase();

    const description = document.createElement("p");
    description.textContent = datas[selectedKey].text;

    // Append elements to contentDisplay
    contentDisplay.appendChild(imageBox);
    contentDisplay.appendChild(title);
    contentDisplay.appendChild(description);
});

// Set Initial Display Content
const initialImageBox = document.createElement("div");
initialImageBox.classList.add("image-box");

const initialImg = document.createElement("img");
initialImg.src = datas['big-bus'].image;
initialImg.alt = "Big Bus";
initialImg.classList.add("vehicle-image");

initialImageBox.appendChild(initialImg);

const initialTitle = document.createElement("h1");
initialTitle.textContent = "BIG BUS";

const initialDescription = document.createElement("p");
initialDescription.textContent = datas['big-bus'].text;

contentDisplay.appendChild(initialImageBox);
contentDisplay.appendChild(initialTitle);
contentDisplay.appendChild(initialDescription);


img.classList.add("vehicle-image");


