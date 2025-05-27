const form = document.getElementById('registration-form');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();
  messageDiv.className = 'hidden';
  messageDiv.textContent = '';

  const { name, email, event: selectedEvent } = form.elements;

  let hasErrors = false;

  if (!name.value.trim()) {
    setError(name, 'Name is required');
    hasErrors = true;
  }

  if (!email.value.trim()) {
    setError(email, 'Email is required');
    hasErrors = true;
  } else if (!validateEmail(email.value.trim())) {
    setError(email, 'Invalid email format');
    hasErrors = true;
  }

  if (!selectedEvent.value) {
    setError(selectedEvent, 'Please select an event');
    hasErrors = true;
  }

  if (hasErrors) return;

  const registrationData = {
    name: name.value.trim(),
    email: email.value.trim(),
    event: selectedEvent.value
  };

  const submitBtn = form.querySelector('button[type="submit"]');
  const spinner = document.createElement('span');
  spinner.classList.add('spinner');
  submitBtn.disabled = true;
  submitBtn.appendChild(spinner);

  // Simulate delayed response
  setTimeout(() => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData)
    })
    .then(response => {
      submitBtn.disabled = false;
      spinner.remove();
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      messageDiv.textContent = `Thank you, ${registrationData.name}! You have registered for "${registrationData.event}".`;
      messageDiv.className = 'success';
      messageDiv.classList.remove('hidden');
      form.reset();
    })
    .catch(error => {
      messageDiv.textContent = `Registration failed: ${error.message}`;
      messageDiv.className = 'error';
      messageDiv.classList.remove('hidden');
    });
  }, 1500);
});

// Helpers
function setError(input, message) {
  const formGroup = input.parentElement;
  const errorMsg = formGroup.querySelector('.error-message');
  errorMsg.textContent = message;
}

function clearErrors() {
  const errors = form.querySelectorAll('.error-message');
  errors.forEach(el => (el.textContent = ''));
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
