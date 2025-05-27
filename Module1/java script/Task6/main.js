// Initial array of events
let events = [
  { name: "Baking Workshop", date: "2025-06-10", category: "Cooking" },
  { name: "Jazz Concert", date: "2025-07-15", category: "Music" },
  { name: "Painting Class", date: "2025-08-05", category: "Art" }
];

// Add new events using push()
events.push({ name: "Rock Festival", date: "2025-09-10", category: "Music" });
events.push({ name: "Yoga Session", date: "2025-07-20", category: "Health" });

// Function to create event card HTML strings
function formatEventCards(eventArray) {
  return eventArray.map(event => {
    return `
      <div class="event-card">
        <h2>Workshop on ${event.name}</h2>
        <p>Date: ${event.date}</p>
        <p>Category: ${event.category}</p>
      </div>
    `;
  }).join('');
}

// Function to render events to container
function renderEvents(eventArray) {
  const container = document.getElementById('events-container');
  container.innerHTML = formatEventCards(eventArray);
}

// Show all events initially
renderEvents(events);

// Show only Music events when button clicked
document.getElementById('show-music-events').addEventListener('click', () => {
  const musicEvents = events.filter(event => event.category === "Music");
  renderEvents(musicEvents);
});
