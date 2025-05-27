const events = [
  { id: 1, name: "Community Cleanup", date: "2025-06-01", seats: 5 },
  { id: 2, name: "Food Festival", date: "2025-07-12", seats: 0 },
  { id: 3, name: "Book Fair", date: "2025-08-20", seats: 3 }
];

const container = document.querySelector("#events-container");

// Render all events dynamically
function renderEvents() {
  container.innerHTML = ""; // Clear previous content

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    const title = document.createElement("h2");
    title.textContent = event.name;

    const date = document.createElement("p");
    date.textContent = `Date: ${event.date}`;

    const seats = document.createElement("p");
    seats.textContent = `Available Seats: ${event.seats}`;
    seats.id = `seats-${event.id}`;

    const message = document.createElement("p");
    message.className = "message";
    message.id = `msg-${event.id}`;

    const registerBtn = document.createElement("button");
    registerBtn.textContent = "Register";
    registerBtn.disabled = event.seats === 0;
    registerBtn.addEventListener("click", () => register(event.id));

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel Registration";
    cancelBtn.disabled = event.seats === 5; // Assume 5 is max seats
    cancelBtn.addEventListener("click", () => cancelRegistration(event.id));

    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(seats);
    card.appendChild(registerBtn);
    card.appendChild(cancelBtn);
    card.appendChild(message);

    container.appendChild(card);
  });
}

// Register user to event
function register(eventId) {
  const event = events.find(e => e.id === eventId);
  const messageEl = document.querySelector(`#msg-${eventId}`);
  const seatsEl = document.querySelector(`#seats-${eventId}`);

  if (event.seats > 0) {
    event.seats--;
    seatsEl.textContent = `Available Seats: ${event.seats}`;
    messageEl.textContent = "✅ Registered successfully!";
    messageEl.style.color = "green";
    renderEvents();
  } else {
    messageEl.textContent = "❌ No seats left!";
    messageEl.style.color = "red";
  }
}

// Cancel registration
function cancelRegistration(eventId) {
  const event = events.find(e => e.id === eventId);
  const messageEl = document.querySelector(`#msg-${eventId}`);
  const seatsEl = document.querySelector(`#seats-${eventId}`);

  // Assuming max seats = 5 (fixed for simplicity)
  if (event.seats < 5) {
    event.seats++;
    seatsEl.textContent = `Available Seats: ${event.seats}`;
    messageEl.textContent = "⚠️ Registration cancelled.";
    messageEl.style.color = "orange";
    renderEvents();
  } else {
    messageEl.textContent = "⚠️ No registrations to cancel.";
    messageEl.style.color = "gray";
  }
}

// Initial render
renderEvents();
