// Filter functionality
function initializeFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const viewButtons = document.querySelectorAll(".view-btn")
  const shuttleCards = document.querySelectorAll(".shuttle-card")

  // Filter by status
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      const filter = button.dataset.filter

      // Show/hide shuttle cards based on filter
      shuttleCards.forEach((card) => {
        const status = card.dataset.status

        if (
          filter === "all" ||
          (filter === "active" && status === "active") ||
          (filter === "inactive" && status === "inactive")
        ) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // View toggle (grid/list)
  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      viewButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      const view = button.dataset.view
      const container = document.getElementById("shuttlesContainer")

      if (view === "list") {
        container.style.gridTemplateColumns = "1fr"
      } else {
        container.style.gridTemplateColumns = "repeat(auto-fit, minmax(350px, 1fr))"
      }
    })
  })
}

// Refresh shuttles data
function refreshShuttles() {
  const button = document.querySelector(".refresh-button")
  button.style.transform = "rotate(360deg)"
  button.style.transition = "transform 0.5s"

  setTimeout(() => {
    button.style.transform = "rotate(0deg)"
    updateShuttleStatus()
  }, 500)
}

// Update shuttle status randomly
function updateShuttleStatus() {
  const shuttleCards = document.querySelectorAll(".shuttle-card")

  shuttleCards.forEach((card) => {
    const statusBadge = card.querySelector(".status-badge")
    const occupancyBadge = card.querySelector(".occupancy-badge")
    const passengerCount = card.querySelector(".detail-value")

    // Randomly update status (20% chance)
    if (Math.random() > 0.8) {
      const isActive = Math.random() > 0.3 // 70% chance to be active

      if (isActive) {
        statusBadge.textContent = "Active"
        statusBadge.className = "status-badge active"
        card.dataset.status = "active"

        const isOccupied = Math.random() > 0.4 // 60% chance to be occupied if active
        occupancyBadge.textContent = isOccupied ? "Occupied" : "Available"
        occupancyBadge.className = isOccupied ? "occupancy-badge occupied" : "occupancy-badge unoccupied"
        card.dataset.occupancy = isOccupied ? "occupied" : "unoccupied"

        // Update passenger count if occupied
        if (isOccupied) {
          const maxCapacity = card.querySelector(".shuttle-img").alt === "Van" ? 15 : 20
          const passengers = Math.floor(Math.random() * maxCapacity) + 1
          const passengerElements = card.querySelectorAll(".detail-value")
          passengerElements[2].textContent = `${passengers}/${maxCapacity}`
        }
      } else {
        statusBadge.textContent = "Not Active"
        statusBadge.className = "status-badge inactive"
        card.dataset.status = "inactive"

        occupancyBadge.textContent = "Unavailable"
        occupancyBadge.className = "occupancy-badge unoccupied"
        card.dataset.occupancy = "unoccupied"
      }
    }
  })

  updateOverviewStats()
}

// Update overview statistics
function updateOverviewStats() {
  const shuttleCards = document.querySelectorAll(".shuttle-card")
  const overviewCards = document.querySelectorAll(".overview-card .overview-number")

  const totalShuttles = shuttleCards.length
  let activeShuttles = 0
  let inactiveShuttles = 0
  let occupiedShuttles = 0

  shuttleCards.forEach((card) => {
    if (card.dataset.status === "active") {
      activeShuttles++
    } else {
      inactiveShuttles++
    }

    if (card.dataset.occupancy === "occupied") {
      occupiedShuttles++
    }
  })

  overviewCards[0].textContent = totalShuttles
  overviewCards[1].textContent = activeShuttles
  overviewCards[2].textContent = inactiveShuttles
  overviewCards[3].textContent = occupiedShuttles
}

// Handle action buttons
function initializeActions() {
  const actionButtons = document.querySelectorAll(".action-btn")

  actionButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation()
      const action = button.textContent.toLowerCase()
      const shuttleCard = button.closest(".shuttle-card")
      const shuttleId = shuttleCard.querySelector(".shuttle-id").textContent

      switch (action) {
        case "track":
          alert(`Tracking ${shuttleId} - GPS location would be shown here`)
          break
        case "contact":
          alert(`Contacting driver of ${shuttleId}`)
          break
        case "activate":
          alert(`Activating ${shuttleId}`)
          break
        case "assign driver":
          alert(`Assigning driver to ${shuttleId}`)
          break
        default:
          alert(`${action} action for ${shuttleId}`)
      }
    })
  })
}

// Initialize shuttles page
document.addEventListener("DOMContentLoaded", () => {
  initializeFilters()
  initializeActions()
  updateOverviewStats()

  // Update shuttle status every 30 seconds
  setInterval(updateShuttleStatus, 30000)

  // Add click handlers for shuttle cards
  const shuttleCards = document.querySelectorAll(".shuttle-card")
  shuttleCards.forEach((card) => {
    card.addEventListener("click", () => {
      const shuttleId = card.querySelector(".shuttle-id").textContent
      alert(`Detailed view for ${shuttleId} would be shown here`)
    })
  })
})
