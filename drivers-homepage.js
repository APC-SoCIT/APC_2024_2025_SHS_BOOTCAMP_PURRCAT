/*homepage*/
// Update current time and date
function updateDateTime() {
  const now = new Date()

  // Format time
  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }
  const timeString = now.toLocaleTimeString("en-US", timeOptions)

  // Format date
  const dateOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }
  const dateString = now.toLocaleDateString("en-GB", dateOptions)

  // Update DOM elements
  const timeElement = document.getElementById("currentTime")
  const dateElement = document.getElementById("currentDate")

  if (timeElement) timeElement.textContent = timeString
  if (dateElement) dateElement.textContent = dateString
}

// Simulate real-time stats updates
document.addEventListener("DOMContentLoaded", () => {
    updateStats(); 
    setInterval(updateStats, 30000); 
});

function updateStats() {
    const statNumbers = document.querySelectorAll(".stat-number");

    statNumbers.forEach((stat, index) => {
        if (Math.random() > 0.5) { 
            let newValue;

            switch (index) {
                case 0: // Active Shuttles
                    newValue = Math.floor(Math.random() * 3) + 1;
                    break;
                case 1: // People Waiting (sum of two areas)
                    const waitingArea1 = Math.floor(Math.random() * 11) + 5; 
                    const waitingArea2 = Math.floor(Math.random() * 11) + 10; 
                    newValue = waitingArea1 + waitingArea2;

                    // Store values for synchronization
                    localStorage.setItem("waitingArea1", waitingArea1);
                    localStorage.setItem("waitingArea2", waitingArea2);
                    localStorage.setItem("totalWaiting", newValue);

                    // Update homepage display
                    document.getElementById("totalWaiting").textContent = newValue;
                    break;
                case 2: // Today's Trips
                    newValue = Math.floor(Math.random() * 43) + 10;
                    break;
                default:
                    return;
            }

            stat.textContent = newValue;
        }
    });
}


// Add new activity item
function addActivity(icon, text) {
  const activityList = document.querySelector(".activity-list")
  const now = new Date()

  const activityItem = document.createElement("div")
  activityItem.className = "activity-item"

  activityItem.innerHTML = `
    <div class="activity-icon">${icon}</div>
    <div class="activity-content">
      <div class="activity-text">${text}</div>
      <div class="activity-time">Just now</div>
    </div>
  `

  // Add to top of list
  activityList.insertBefore(activityItem, activityList.firstChild)

  // Remove oldest item if more than 5 items
  const items = activityList.querySelectorAll(".activity-item")
  if (items.length > 5) {
    activityList.removeChild(items[items.length - 1])
  }

  // Update timestamps
  updateActivityTimestamps()
}

// Update activity timestamps
function updateActivityTimestamps() {
  const timeElements = document.querySelectorAll(".activity-time")
  timeElements.forEach((element, index) => {
    const minutes = index + 1
    if (minutes === 1) {
      element.textContent = "Just now"
    } else {
      element.textContent = `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    }
  })
}

// Simulate random activities
function simulateActivity() {
  const activities = [
    { icon: "🚌", text: "Shuttle 1 departed from APC" },
    { icon: "🚌", text: "Shuttle 2 arrived at Lapu-Lapu Street" },
    { icon: "👥", text: "12 passengers boarded at APC" },
    { icon: "👥", text: "8 passengers alighted at Lapu-Lapu Street" },
    { icon: "🚌", text: "Shuttle 3 started maintenance check" },
    { icon: "👥", text: "Queue cleared at waiting area" },
  ]

  const randomActivity = activities[Math.floor(Math.random() * activities.length)]
  addActivity(randomActivity.icon, randomActivity.text)
}

// Initialize homepage
document.addEventListener("DOMContentLoaded", () => {
  // Update time immediately and then every minute
  updateDateTime()
  setInterval(updateDateTime, 60000)

  // Update stats every 30 seconds
  setInterval(updateStats, 30000)

  // Update activity timestamps every minute
  setInterval(updateActivityTimestamps, 60000)

  // Add random activity every 2-5 minutes
  setInterval(simulateActivity, Math.random() * 180000 + 120000)

  // Add hover effects to navigation cards
  const navCards = document.querySelectorAll(".nav-card")
  navCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-2px)"
    })
  })
})
