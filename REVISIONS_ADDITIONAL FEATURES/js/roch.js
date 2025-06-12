document.addEventListener("DOMContentLoaded", function() {

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

// start of information html javascript
// for information HTMl big bus, small bus, van
let shuttleStatus = {
    'big-bus': 'inactive',  // Default values (adjust as needed)
    'small-bus': 'inactive',
    'van': 'inactive'
};

const datas = {
    'big-bus': {
        image: '../images/big-bus.png',
        text: shuttleStatus['big-bus'] === 'active' ? 'Status: Active' : 'Status: Inactive'
    },
    'small-bus': {
        image: '../images/small-bus.png',
        text: shuttleStatus['small-bus'] === 'active' ? 'Status: Active' : 'Status: Inactive'
    },
    'van': {
        image: '../images/van.png',
        text: shuttleStatus['van'] === 'active' ? 'Status: Active' : 'Status: Inactive'
    }
};

const selectionList = document.getElementById('selectionList');
const contentDisplay = document.getElementById('contentDisplay');

console.log(selectionList, contentDisplay);

if (selectionList && contentDisplay) {
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

    // for selection
    selectionList.addEventListener('change', (event) => {
        const selectedKey = event.target.value;
        contentDisplay.innerHTML = "";

        // image container
        const imageBox = document.createElement("div");
        imageBox.classList.add("image-box");

        // image element
        const img = document.createElement("img");
        img.src = datas[selectedKey].image;
        img.alt = selectedKey;

        // CSS connection
        img.classList.add("vehicle-image");

        // image to container
        imageBox.appendChild(img);

        // for text
        const title = document.createElement("h1");
        title.textContent = selectedKey.replace("-", " ").toUpperCase();

        const description = document.createElement("p");
        description.textContent = datas[selectedKey].text;

        // elements to contentDisplay
        contentDisplay.appendChild(imageBox);
        contentDisplay.appendChild(title);
        contentDisplay.appendChild(description);
    });

    // Display content
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
}

// gps javascript
// Authenticate with Traccar API
fetch("http://192.168.1.182:8082/api/session", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: "include",
    body: new URLSearchParams({
        email: "rintarwnn@gmail.com",
        password: "admin"
    })
})
.then(res => {
    if (!res.ok) throw new Error("Login failed");
    return res.json();
})
.then(() => fetch("http://192.168.1.182:8082/api/devices", { credentials: "include" }))
.then(res => {
    if (!res.ok) throw new Error("Device fetch failed");
    return res.json();
})
.then(devices => {
    if (!devices.length) throw new Error("No devices found");
    const deviceId = devices[0].id;
    return fetch(`http://192.168.1.182:8082/api/positions?deviceId=${deviceId}`, {
        credentials: "include"
    });
})
.then(res => {
    if (!res.ok) throw new Error("Position fetch failed");
    return res.json();
})
.then(positions => {
    if (!positions.length) throw new Error("No positions found");

    const { latitude: lat, longitude: lon } = positions[0];
    const destinationLat = 14.5312913;
    const destinationLon = 121.0213487;

    const map = L.map('map', { zoomControl: true });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const driverMarker = L.marker([lat, lon]).addTo(map).bindPopup("📍 Driver location");
    const userMarker = L.marker([destinationLat, destinationLon]).addTo(map).bindPopup("📍 You");

    const group = new L.featureGroup([driverMarker, userMarker]);
    map.fitBounds(group.getBounds().pad(0.2));

    // Enable interactions
    map.scrollWheelZoom.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
    map.dragging.enable();

    // Get ETA from Flask
    return fetch('http://127.0.0.1:5000/get_eta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            origin: [lon, lat],
            destination: [destinationLon, destinationLat]
        })
    });
})
.then(res => res.json())
.then(data => {
    const etaDisplay = document.querySelector('.arrival-time');
    etaDisplay.textContent = data.eta_minutes ? `${data.eta_minutes} minutes` : 'ETA unavailable';
})
.catch(error => {
    console.error("❌ Error:", error);
});

// "I'm here" button functionality with confirmation popup
const btn = document.getElementById("imHereBtn");
if (btn) {
    btn.addEventListener("click", function () {
        console.log("Button was clicked!");
        this.disabled = true;
        this.innerText = "Noted!";
        this.classList.add("pressed");

        fetch("http://localhost:3000/updateCount", { method: "POST" })
            .then(response => response.json())
            .then(data => {
                alert("Driver has been notified!");
                console.log("✅ Count updated successfully! Current count:", data.count);
            })
            .catch(error => console.error("❌ Error updating count:", error));
    });
}

});

//start of information html javascript
// for information HTMl big bus, small bus, van
const datas = {
    'big-bus': {
        image: '../images/big-bus.png',
        text: shuttleStatus['big-bus'] === 'active' ? 'Status: Active' : 'Status: Inactive'
    },
    'small-bus': {
        image: '../images/small-bus.png',
        text: shuttleStatus['small-bus'] === 'active' ? 'Status: Active' : 'Status: Inactive'
    },
    'van': {
        image: '../images/van.png',
        text: shuttleStatus['van'] === 'active' ? 'Status: Active' : 'Status: Inactive'
    }
};

const selectionList = document.getElementById('selectionList');
const contentDisplay = document.getElementById('contentDisplay');

console.log(selectionList, contentDisplay);

if (selectionList && contentDisplay) {

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

    // for selection
    selectionList.addEventListener('change', (event) => {
        const selectedKey = event.target.value;
        contentDisplay.innerHTML = "";

        // image container
        const imageBox = document.createElement("div");
        imageBox.classList.add("image-box");

        // image element
        const img = document.createElement("img");
        img.src = datas[selectedKey].image;
        img.alt = selectedKey;

        // CSS connection
        img.classList.add("vehicle-image");

        // image to container
        imageBox.appendChild(img);

        // for text
        const title = document.createElement("h1");
        title.textContent = selectedKey.replace("-", " ").toUpperCase();

        const description = document.createElement("p");
        description.textContent = datas[selectedKey].text;

        // elements to contentDisplay
        contentDisplay.appendChild(imageBox);
        contentDisplay.appendChild(title);
        contentDisplay.appendChild(description);
    });

    // Display content
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

    // Removed invalid line: img.classList.add("vehicle-image");
}// gps javascript
// Authenticate with Traccar API
fetch("http://192.168.1.182:8082/api/session", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: "include",
    body: new URLSearchParams({
        email: "rintarwnn@gmail.com",
        password: "admin"
    })
})
.then(res => {
    if (!res.ok) throw new Error("Login failed");
    return res.json();
})
.then(() => fetch("http://192.168.1.182:8082/api/devices", { credentials: "include" }))
.then(res => {
    if (!res.ok) throw new Error("Device fetch failed");
    return res.json();
})
.then(devices => {
    if (!devices.length) throw new Error("No devices found");
    const deviceId = devices[0].id;
    return fetch(`http://192.168.1.182:8082/api/positions?deviceId=${deviceId}`, {
        credentials: "include"
    });
})
.then(res => {
    if (!res.ok) throw new Error("Position fetch failed");
    return res.json();
})
.then(positions => {
    if (!positions.length) throw new Error("No positions found");

    const { latitude: lat, longitude: lon } = positions[0];
    const destinationLat = 14.5312913;
    const destinationLon = 121.0213487;

    const map = L.map('map', { zoomControl: true });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const driverMarker = L.marker([lat, lon]).addTo(map).bindPopup("📍 Driver location");
    const userMarker = L.marker([destinationLat, destinationLon]).addTo(map).bindPopup("📍 You");

    const group = new L.featureGroup([driverMarker, userMarker]);
    map.fitBounds(group.getBounds().pad(0.2));

    // Enable interactions
    map.scrollWheelZoom.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
    map.dragging.enable();

    // Get ETA from Flask
    return fetch('http://127.0.0.1:5000/get_eta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            origin: [lon, lat],
            destination: [destinationLon, destinationLat]
        })
    });
})
.then(res => res.json())
.then(data => {
    const etaDisplay = document.querySelector('.arrival-time');
    etaDisplay.textContent = data.eta_minutes ? `${data.eta_minutes} minutes` : 'ETA unavailable';
})
.catch(error => {
    console.error("❌ Error:", error);

    const map = L.map('map', { zoomControl: true }).setView([14.5312913, 121.0213487], 17);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
});

// "I'm here" button
window.onload = function () {
    const btn = document.getElementById("imHereBtn");
    if (btn) {
        btn.addEventListener("click", function () {
            this.disabled = true;
            this.innerText = "Noted!";
            this.classList.add("pressed");
        });
    }
};