// Search and filter functionality
function initializeSearch() {
  const searchInput = document.getElementById("searchInput")
  const dateFilter = document.getElementById("dateFilter")
  const routeFilter = document.getElementById("routeFilter")
  const sortBy = document.getElementById("sortBy")

  // Search functionality
  searchInput.addEventListener("input", filterHistory)
  dateFilter.addEventListener("change", filterHistory)
  routeFilter.addEventListener("change", filterHistory)
  sortBy.addEventListener("change", sortHistory)
}

// Filter history items
function filterHistory() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase()
  const dateFilter = document.getElementById("dateFilter").value
  const routeFilter = document.getElementById("routeFilter").value
  const historyItems = document.querySelectorAll(".history-item")

  historyItems.forEach((item) => {
    const route = item.querySelector(".history-route").textContent.toLowerCase()
    const date = item.dataset.date
    const routeData = item.dataset.route

    let showItem = true

    // Search filter
    if (searchTerm && !route.includes(searchTerm)) {
      showItem = false
    }

    // Route filter
    if (routeFilter !== "all" && routeData !== routeFilter) {
      showItem = false
    }

    // Date filter
    if (dateFilter !== "today") {
      const itemDate = new Date(date)
      const today = new Date()

      switch (dateFilter) {
        case "yesterday":
          const yesterday = new Date(today)
          yesterday.setDate(today.getDate() - 1)
          if (itemDate.toDateString() !== yesterday.toDateString()) {
            showItem = false
          }
          break
        case "week":
          const weekAgo = new Date(today)
          weekAgo.setDate(today.getDate() - 7)
          if (itemDate < weekAgo) {
            showItem = false
          }
          break
        case "month":
          const monthAgo = new Date(today)
          monthAgo.setMonth(today.getMonth() - 1)
          if (itemDate < monthAgo) {
            showItem = false
          }
          break
      }
    }

    item.style.display = showItem ? "flex" : "none"
  })
}

// Sort history items
function sortHistory() {
  const sortBy = document.getElementById("sortBy").value
  const historyList = document.getElementById("historyList")
  const items = Array.from(historyList.querySelectorAll(".history-item"))

  items.sort((a, b) => {
    switch (sortBy) {
      case "time-desc":
        return new Date(b.dataset.date) - new Date(a.dataset.date)
      case "time-asc":
        return new Date(a.dataset.date) - new Date(b.dataset.date)
      case "passengers-desc":
        const aPassengers = Number.parseInt(a.querySelector(".detail-item:nth-child(3) span:last-child").textContent)
        const bPassengers = Number.parseInt(b.querySelector(".detail-item:nth-child(3) span:last-child").textContent)
        return bPassengers - aPassengers
      case "duration-desc":
        const aDuration = a.querySelector(".detail-item:nth-child(4) span:last-child").textContent
        const bDuration = b.querySelector(".detail-item:nth-child(4) span:last-child").textContent
        return bDuration.localeCompare(aDuration)
      default:
        return 0
    }
  })

  // Re-append sorted items
  items.forEach((item) => historyList.appendChild(item))
}

// Load more trips
function loadMoreTrips() {
  const historyList = document.getElementById("historyList")
  const loadMoreBtn = document.querySelector(".load-more-btn")

  // Simulate loading
  loadMoreBtn.textContent = "Loading..."
  loadMoreBtn.disabled = true

  setTimeout(() => {
    // Add more history items (simulated data)
    const newTrips = [
      {
        route: "APC to Layan-Layan",
        shuttle: "Shuttle 001",
        date: "May 25, 2025",
        time: "6:15 PM - 6:30 PM",
        passengers: "15 passengers",
        duration: "15 minutes",
      },
      {
        route: "Layan-Layan to APC",
        shuttle: "Shuttle 002",
        date: "May 25, 2025",
        time: "6:00 PM - 6:15 PM",
        passengers: "9 passengers",
        duration: "15 minutes",
      },
    ]

    newTrips.forEach((trip) => {
      const historyItem = document.createElement("div")
      historyItem.className = "history-item"
      historyItem.dataset.route = trip.route.includes("APC to") ? "apc-layan" : "layan-apc"
      historyItem.dataset.date = "2025-05-25"

      historyItem.innerHTML = `
        <div class="history-icon">
          <img src="images/bus-icon.png" alt="Bus">
        </div>
        <div class="history-main">
          <div class="history-header">
            <div class="history-route">${trip.route}</div>
            <div class="history-shuttle">${trip.shuttle}</div>
          </div>
          <div class="history-details">
            <div class="detail-item">
              <span class="detail-icon">📅</span>
              <span>${trip.date}</span>
            </div>
            <div class="detail-item">
              <span class="detail-icon">🕐</span>
              <span>${trip.time}</span>
            </div>
            <div class="detail-item">
              <span class="detail-icon">👥</span>
              <span>${trip.passengers}</span>
            </div>
            <div class="detail-item">
              <span class="detail-icon">⏱️</span>
              <span>${trip.duration}</span>
            </div>
          </div>
        </div>
        <div class="history-status">
          <span class="status-badge completed">Completed</span>
          <button class="details-btn">View Details</button>
        </div>
      `

      historyList.appendChild(historyItem)
    })

    loadMoreBtn.textContent = "Load More Trips"
    loadMoreBtn.disabled = false

    // Add click handlers to new items
    initializeHistoryItemHandlers()
  }, 1000)
}

// Initialize history item click handlers
function initializeHistoryItemHandlers() {
  const detailsButtons = document.querySelectorAll(".details-btn")

  detailsButtons.forEach((button) => {
    button.removeEventListener("click", handleDetailsClick) // Remove existing listeners
    button.addEventListener("click", handleDetailsClick)
  })
}

// Handle details button click
function handleDetailsClick(e) {
  e.stopPropagation()
  const historyItem = e.target.closest(".history-item")
  const route = historyItem.querySelector(".history-route").textContent
  const shuttle = historyItem.querySelector(".history-shuttle").textContent
  alert(`Detailed trip information for ${route} (${shuttle}) would be shown here`)
}

// Export functionality
function exportHistory() {
  const exportBtn = document.querySelector(".export-button")
  exportBtn.textContent = "Exporting..."
  exportBtn.disabled = true

  setTimeout(() => {
    alert("History exported successfully! (In a real app, this would download a CSV/PDF file)")
    exportBtn.textContent = "Export"
    exportBtn.disabled = false
  }, 1000)
}

// Update summary stats
function updateSummaryStats() {
  const summaryNumbers = document.querySelectorAll(".summary-number")

  // Simulate real-time updates (small random changes)
  summaryNumbers.forEach((stat, index) => {
    if (Math.random() > 0.95) {
      // 5% chance to update
      const currentValue = Number.parseInt(stat.textContent.replace(/[^\d]/g, ""))
      let change = 0

      switch (index) {
        case 0: // Total trips
          change = Math.floor(Math.random() * 3) - 1 // -1 to +1
          break
        case 1: // Passengers served
          change = Math.floor(Math.random() * 20) - 10 // -10 to +10
          break
        case 2: // Avg passengers per trip
          const newAvg = (currentValue + (Math.random() * 2 - 1)).toFixed(1)
          stat.textContent = newAvg
          return
        case 3: // Avg trip duration
          const newDuration = Math.max(15, currentValue + Math.floor(Math.random() * 3) - 1)
          stat.textContent = newDuration + "m"
          return
      }

      const newValue = Math.max(0, currentValue + change)
      if (index === 1) {
        stat.textContent = newValue.toLocaleString()
      } else {
        stat.textContent = newValue
      }
    }
  })
}

// Initialize history page
document.addEventListener("DOMContentLoaded", () => {
  initializeSearch()
  initializeHistoryItemHandlers()

  // Add export button handler
  const exportBtn = document.querySelector(".export-button")
  if (exportBtn) {
    exportBtn.addEventListener("click", exportHistory)
  }

  // Add load more button handler
  const loadMoreBtn = document.querySelector(".load-more-btn")
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", loadMoreTrips)
  }

  // Update summary stats every 30 seconds
  setInterval(updateSummaryStats, 30000)

  // Add click handlers for history items
  const historyItems = document.querySelectorAll(".history-item")
  historyItems.forEach((item) => {
    item.addEventListener("click", () => {
      const route = item.querySelector(".history-route").textContent
      const shuttle = item.querySelector(".history-shuttle").textContent
      alert(`Trip overview for ${route} (${shuttle}) would be shown here`)
    })
  })
})
