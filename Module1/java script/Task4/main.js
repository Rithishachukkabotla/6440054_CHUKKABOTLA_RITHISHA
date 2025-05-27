// Sample event data
let events = [];

// Add event function
function addEvent(name, date, seats, category) {
  events.push({ name, date, seats, category });
}

// Closure to track total registrations per category
function createCategoryTracker() {
  const counts = {};
  return function registerCategory(category) {
    if (!counts[category]) {
      counts[category] = 0;
    }
    counts[category]++;
    console.log(`Total registrations for ${category}: ${counts[category]}`);
  };
}

const trackRegistrationByCategory = createCategoryTracker();

// Register user function
function registerUser(event, index) {
  try {
    if (event.seats > 0) {
      event.seats--;
      document.getElementById(`seats-${index}`).textContent = event.seats;
      document.getElementById(`message-${index}`).textContent = "✅ Registered!";
      document.getElementById(`message-${index}`).style.color = "green";
      trackRegistrationByCategory(event.category);
    } else {
      throw new Error("❌ No seats left.");
    }
  } catch (error) {
    document.getElementById(`message-${index}`).textContent = error.message;
    document.getElementById(`message-${index}`).style.color = "red";
  }
}

// Filter events by category
function filterEventsByCategory(category) {
  if (category === "All") return events;
  return events.filter(e => e.category === category);
}

// Render events
function renderEvents(filteredEvents) {
  const container = document.getElementById("events-container");
  container.innerHTML = "";

  filteredEvents.forEach((event, index) => {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <h3>${event.name}</h3>
      <p>Date: ${event.date}</p>
      <p>Category: ${event.category}</p>
      <p>Available Seats: <span id="seats-${index}">${event.seats}</span></p>
      <button onclick="registerUser(events[${index}], ${index})">Register</button>
      <p id="message-${index}"></p>
    `;

    container.appendChild(card);
  });
}

// Filter handler with callback
function setupCategoryFilter() {
  const filter = document.getElementById("category-filter");
  filter.addEventListener("change", (e) => {
    const category = e.target.value;
    const filtered = filterEventsByCategory(category);
    renderEvents(filtered);
  });
}

// Add sample events
addEvent("JavaScript Bootcamp", "2025-07-10", 5, "Tech");
addEvent("Art in the Park", "2025-08-15", 3, "Art");
addEvent("Live Jazz Night", "2025-06-25", 4, "Music");
addEvent("React Workshop", "2025-07-20", 6, "Tech");

// Initialize
setupCategoryFilter();
renderEvents(events);
