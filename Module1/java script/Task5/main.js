// Event constructor using class syntax
class Event {
  constructor(name, date, seats, category) {
    this.name = name;
    this.date = date;
    this.seats = seats;
    this.category = category;
  }
}

// Add checkAvailability() to prototype
Event.prototype.checkAvailability = function () {
  return this.seats > 0 ? "Available" : "Full";
};

// Sample events
const events = [
  new Event("Web Dev Meetup", "2025-07-15", 10, "Tech"),
  new Event("Painting Workshop", "2025-08-01", 0, "Art"),
  new Event("Jazz Night", "2025-09-05", 5, "Music")
];

// Display events using Object.entries()
const container = document.getElementById("events-container");

events.forEach((eventObj) => {
  const card = document.createElement("div");
  card.className = "event-card";

  let details = "<ul>";
  for (const [key, value] of Object.entries(eventObj)) {
    details += `<li><strong>${key}</strong>: ${value}</li>`;
  }
  details += `<li><strong>Availability</strong>: ${eventObj.checkAvailability()}</li>`;
  details += "</ul>";

  card.innerHTML = `
    <h2>${eventObj.name}</h2>
    ${details}
  `;

  container.appendChild(card);
});
