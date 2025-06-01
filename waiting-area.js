function updateNumbers() {
    const waitingAreaAPC = document.getElementById("waitingAreaAPC");
    const waitingAreaLapu = document.getElementById("waitingAreaLapu");

   
    const waitingArea1 = localStorage.getItem("waitingArea1") || Math.floor(Math.random() * 11) + 5;
    const waitingArea2 = localStorage.getItem("waitingArea2") || Math.floor(Math.random() * 11) + 10;

    
    waitingAreaAPC.textContent = waitingArea1;
    waitingAreaLapu.textContent = waitingArea2;
}

setInterval(updateNumbers, 300000); 
document.addEventListener("DOMContentLoaded", updateNumbers);
