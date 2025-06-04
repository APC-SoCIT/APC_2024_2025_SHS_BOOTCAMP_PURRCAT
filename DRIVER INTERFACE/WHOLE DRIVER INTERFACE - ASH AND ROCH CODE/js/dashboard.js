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

// Simulate real-time shuttle status updates
function updateShuttleStatus() {
  const shuttleCards = document.querySelectorAll(".shuttle-card")

  shuttleCards.forEach((card, index) => {
    const statusBadge = card.querySelector(".status-badge")
    const occupancyBadge = card.querySelector(".occupancy-badge")

    // Randomly update status (simulate real-time changes)
    if (Math.random() > 0.8) {
      // 20% chance to change status
      const isActive = Math.random() > 0.3 // 70% chance to be active

      if (isActive) {
        statusBadge.textContent = "Active"
        statusBadge.className = "status-badge active"

        const isOccupied = Math.random() > 0.4 // 60% chance to be occupied if active
        occupancyBadge.textContent = isOccupied ? "Occupied" : "Available"
        occupancyBadge.className = isOccupied ? "occupancy-badge occupied" : "occupancy-badge unoccupied"
      } else {
        statusBadge.textContent = "Not Active"
        statusBadge.className = "status-badge inactive"
        occupancyBadge.textContent = "Unavailable"
        occupancyBadge.className = "occupancy-badge unoccupied"
      }
    }
  })
}

// Add new history item (simulate new trips)
function addHistoryItem() {
  const historyList = document.querySelector(".history-list")
  const now = new Date()

  // Create new history item
  const historyItem = document.createElement("div")
  historyItem.className = "history-item"

  const routes = ["APC to Layan-Layan", "Layan-Layan to APC"]
  const passengers = Math.floor(Math.random() * 15) + 1
  const route = routes[Math.floor(Math.random() * routes.length)]

  const startTime = new Date(now.getTime() - Math.random() * 30 * 60000) // Random time in last 30 minutes
  const endTime = new Date(startTime.getTime() + (Math.random() * 20 + 10) * 60000) // 10-30 minutes later

  historyItem.innerHTML = `
    <div class="history-image">
      <img src="images/bus-icon.png" alt="Bus">
    </div>
    <div class="history-details">
      <div class="history-date">${now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
      <div class="history-time">${startTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })} - ${endTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}</div>
      <div class="history-passengers">${passengers} passengers</div>
      <div class="history-route">${route}</div>
    </div>
  `

  // Add to top of list
  historyList.insertBefore(historyItem, historyList.firstChild)

  // Remove oldest item if more than 10 items
  const items = historyList.querySelectorAll(".history-item")
  if (items.length > 10) {
    historyList.removeChild(items[items.length - 1])
  }
}

// Handle responsive layout changes
function handleResize() {
  const container = document.querySelector(".dashboard-container")
  const width = window.innerWidth

  // Add classes for different screen sizes
  container.classList.remove("mobile", "tablet", "desktop")

  if (width <= 768) {
    container.classList.add("mobile")
  } else if (width <= 1024) {
    container.classList.add("tablet")
  } else {
    container.classList.add("desktop")
  }
}

// Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
  // Update time immediately and then every minute
  updateDateTime()
  setInterval(updateDateTime, 60000)

  // Update shuttle status every 30 seconds
  setInterval(updateShuttleStatus, 30000)

  // Add new history item every 5 minutes (for demo purposes)
  setInterval(addHistoryItem, 300000)

  // Handle window resize
  handleResize()
  window.addEventListener("resize", handleResize)

  // Add click handlers for interactive elements
  const shuttleCards = document.querySelectorAll(".shuttle-card")
  shuttleCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      alert(`Shuttle ${index + 1} details would be shown here`)
    })
  })

  const historyItems = document.querySelectorAll(".history-item")
  historyItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      alert(`Trip details would be shown here`)
    })
  })

  // Add hover effects
  const cards = document.querySelectorAll(".card, .shuttle-card, .history-item")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
      this.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = ""
    })
  })
})

// Export functions for potential external use
window.dashboardFunctions = {
  updateDateTime,
  updateShuttleStatus,
  addHistoryItem,
}
