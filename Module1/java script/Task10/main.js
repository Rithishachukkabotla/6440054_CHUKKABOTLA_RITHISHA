const events = [
  { id: 1, name: "Community Gardening", date: "2025-06-15", seats: 10, category: "Environment" },
  { id: 2, name: "Tech Workshop", date: "2025-07-01", seats: 5, category: "Tech" },
  { id: 3, name: "Yoga Class", date: "2025-07-10", seats: 8, category: "Health" },
  { id: 4, name: "Tree Planting", date: "2025-08-05", seats: 12, category: "Environment" },
];

// Create event card HTML - default param destructuring
const createEventCard = ({ name = 'No name', date = 'TBD', seats = 0, category = 'Unknown' } = {}) => `
  <div class="event-card">
    <h2>${name}</h2>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Seats available:</strong> ${seats}</p>
    <p><strong>Category:</strong> ${category}</p>
  </div>
`;

// Render event list
const renderEvents = (eventList = []) => {
  const container = document.querySelector("#events-container");
  container.innerHTML = eventList.map(event => createEventCard(event)).join('');
};

// Filter events by category (cloning with spread operator)
const filterEventsByCategory = (category = 'all') => {
  // Clone original events with spread operator
  let clonedEvents = [...events];

  if (category.toLowerCase() === 'all') return clonedEvents;

  // Use destructuring to extract category for each event
  return clonedEvents.filter(({ category: cat }) => cat === category);
};

// Initial render with all events
renderEvents(events);

// Setup event listener on dropdown
const categoryFilter = document.querySelector("#category-filter");
categoryFilter.addEventListener("change", (e) => {
  const selectedCategory = e.target.value;
  const filtered = filterEventsByCategory(selectedCategory);
  renderEvents(filtered);
});
