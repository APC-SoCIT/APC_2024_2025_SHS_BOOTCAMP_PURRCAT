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
function updateStats() {
  const statNumbers = document.querySelectorAll(".stat-number")

  // Randomly update stats to simulate real-time changes
  statNumbers.forEach((stat, index) => {
    if (Math.random() > 0.9) {
      // 10% chance to update
      const currentValue = Number.parseInt(stat.textContent)
      let newValue

      switch (index) {
        case 0: // Active Shuttles (0-3)
          newValue = Math.floor(Math.random() * 3) + 1;
          break
        case 1: // People Waiting (15-35)
          newValue = Math.floor(Math.random() * 21) + 15
          break
        case 2: // Today's Trips (100-200)
          newValue = Math.floor(Math.random() * 101) + 100
          break
        default:
          newValue = currentValue
      }

      stat.textContent = newValue
    }
  })
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
