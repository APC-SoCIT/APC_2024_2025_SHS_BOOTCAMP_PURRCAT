//for driver_interface/waiting_line.html

function updateNumbers() {
    fetch("http://localhost:3000/getCount")
        .then(response => response.json())
        .then(data => {
            document.getElementById("waitingAreaAPC").textContent = data.count; 
        })
        .catch(error => console.error("❌ Error fetching count:", error));
}


setInterval(updateNumbers, 3000);


updateNumbers();

