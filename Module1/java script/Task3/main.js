// Sample event list
const events = [
  { name: "Coding Workshop", date: "2025-07-01", seats: 3 },
  { name: "Art Expo", date: "2025-05-10", seats: 0 },
  { name: "Music Festival", date: "2025-08-20", seats: 10 },
  { name: "Local Farmers Market", date: "2025-04-30", seats: 5 }
];

const container = document.getElementById("events-container");
const today = new Date();

// Loop through events and display only valid ones
events.forEach((event, index) => {
  const eventDate = new Date(event.date);
  if (eventDate > today && event.seats > 0) {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <h2>${event.name}</h2>
      <p>Date: ${event.date}</p>
      <p>Available Seats: <span id="seats-${index}">${event.seats}</span></p>
      <button onclick="register(${index})">Register</button>
      <p class="message" id="message-${index}"></p>
    `;

    container.appendChild(card);
  }
});

// Handle registration with try-catch
function register(index) {
  try {
    const event = events[index];
    const message = document.getElementById(`message-${index}`);
    const seatSpan = document.getElementById(`seats-${index}`);

    if (event.seats > 0) {
      event.seats--; // reduce seat
      seatSpan.textContent = event.seats;
      message.textContent = "✅ Successfully registered!";
      message.style.color = "green";
    } else {
      throw new Error("❌ No seats left.");
    }
  } catch (error) {
    const message = document.getElementById(`message-${index}`);
    message.textContent = error.message;
    message.style.color = "red";
  }
}
