//for driver_interface/waiting_line.html

function updateNumbers() {
    fetch("http://localhost:3000/getCount")
        .then(response => response.json())
        .then(data => {
            document.getElementById("waitingAreaAPC").textContent = data.count; // ✅ Updates only APC
        })
        .catch(error => console.error("❌ Error fetching count:", error));
}


// Refresh the count every 3 seconds for both passenger & driver views
setInterval(updateNumbers, 3000);

// Call function on page load
updateNumbers();

