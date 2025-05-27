const eventsContainer = document.getElementById("events-container");
const spinner = document.getElementById("spinner");
const loadThenBtn = document.getElementById("load-events-then");
const loadAsyncBtn = document.getElementById("load-events-async");

// Mock API URL - You can replace this with an actual API or local JSON file
const MOCK_API_URL = "https://mocki.io/v1/5e2a2d43-16d0-4a34-8026-4b3c5ee1e7b7";

// Show spinner
function showSpinner() {
  spinner.classList.remove("hidden");
}

// Hide spinner
function hideSpinner() {
  spinner.classList.add("hidden");
}

// Render events to DOM
function renderEvents(events) {
  eventsContainer.innerHTML = "";
  if (!events || events.length === 0) {
    eventsContainer.innerHTML = "<p>No events found.</p>";
    return;
  }

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <h2>${event.name}</h2>
      <p>Date: ${event.date}</p>
      <p>Category: ${event.category || "N/A"}</p>
    `;
    eventsContainer.appendChild(card);
  });
}

// Fetch with .then() / .catch()
function fetchEventsThen() {
  showSpinner();
  fetch(MOCK_API_URL)
    .then(response => {
      if (!response.ok) throw new Error("Network response not ok");
      return response.json();
    })
    .then(data => {
      hideSpinner();
      renderEvents(data.events);
    })
    .catch(err => {
      hideSpinner();
      eventsContainer.innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
    });
}

// Fetch with async/await
async function fetchEventsAsync() {
  showSpinner();
  try {
    const response = await fetch(MOCK_API_URL);
    if (!response.ok) throw new Error("Network response not ok");
    const data = await response.json();
    hideSpinner();
    renderEvents(data.events);
  } catch (err) {
    hideSpinner();
    eventsContainer.innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
  }
}

loadThenBtn.onclick = fetchEventsThen;
loadAsyncBtn.onclick = fetchEventsAsync;
