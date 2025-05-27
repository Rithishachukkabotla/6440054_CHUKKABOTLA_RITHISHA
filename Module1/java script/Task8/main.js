const events = [
  { id: 1, name: "Jazz Night", date: "2025-06-15", seats: 5, category: "Music" },
  { id: 2, name: "Painting Workshop", date: "2025-07-10", seats: 3, category: "Art" },
  { id: 3, name: "Tech Meetup", date: "2025-08-05", seats: 0, category: "Tech" },
  { id: 4, name: "Yoga Class", date: "2025-09-01", seats: 4, category: "Health" },
  { id: 5, name: "Rock Concert", date: "2025-10-12", seats: 2, category: "Music" }
];

const container = document.querySelector("#events-container");
const categoryFilter = document.querySelector("#category-filter");
const searchInput = document.querySelector("#search-input");

let filteredEvents = [...events];

// Render events
function renderEvents(eventList) {
  container.innerHTML = "";

  if (eventList.length === 0) {
    container.innerHTML = "<p>No events found.</p>";
    return;
  }

  eventList.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <h2>${event.name}</h2>
      <p>Date: ${event.date}</p>
      <p>Category: ${event.category}</p>
      <p>Seats Available: ${event.seats}</p>
    `;

    const btn = document.createElement("button");
    btn.textContent = "Register";
    btn.disabled = event.seats === 0;
    btn.onclick = () => register(event.id);

    card.appendChild(btn);
    container.appendChild(card);
  });
}

// Register function (reduce seats)
function register(eventId) {
  const event = events.find(e => e.id === eventId);
  if (event.seats > 0) {
    event.seats--;
    applyFilters(); // re-render with updated seats
    alert(`Registered for ${event.name}!`);
  }
}

// Filter events by category and search term
function applyFilters() {
  const categoryValue = categoryFilter.value.toLowerCase();
  const searchValue = searchInput.value.toLowerCase();

  filteredEvents = events.filter(event => {
    const matchesCategory = categoryValue === "all" || event.category.toLowerCase() === categoryValue;
    const matchesSearch = event.name.toLowerCase().includes(searchValue);
    return matchesCategory && matchesSearch;
  });

  renderEvents(filteredEvents);
}

// Event listeners
categoryFilter.onchange = applyFilters;

searchInput.onkeydown = (e) => {
  // Trigger search on every key press
  // Delay with setTimeout to avoid excessive calls (optional)
  setTimeout(applyFilters, 100);
};

// Initial render
renderEvents(events);
