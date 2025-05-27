// Use const for event name and date
const eventName = "Coding Workshop";
const eventDate = "2025-06-15";

// Use let for available seats
let availableSeats = 5;

// Display event info using template literals
const eventInfo = `📅 Event: ${eventName} <br> 🗓 Date: ${eventDate} <br> 🎟 Available Seats: <span id="seat-count">${availableSeats}</span>`;
document.getElementById("event-info").innerHTML = eventInfo;

// Handle registration button click
document.getElementById("register-btn").addEventListener("click", () => {
  const seatDisplay = document.getElementById("seat-count");
  const message = document.getElementById("message");

  if (availableSeats > 0) {
    availableSeats--; // Decrease seat count
    seatDisplay.textContent = availableSeats;
    message.textContent = "✅ Registration successful!";
    message.style.color = "green";
  } else {
    message.textContent = "❌ No seats available.";
    message.style.color = "red";
  }
});
