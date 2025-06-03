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
