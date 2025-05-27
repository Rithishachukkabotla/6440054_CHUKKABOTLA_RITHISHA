const form = document.getElementById('registration-form');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Form submission started'); // Debug log

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

  if (hasErrors) {
    console.log('Validation failed');
    return; // Stop submission if errors
  }

  const registrationData = {
    name: name.value.trim(),
    email: email.value.trim(),
    event: selectedEvent.value
  };

  console.log('Validated registration data:', registrationData);

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;

  // Add breakpoint here if you want to inspect before fetch
  // debugger;

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registrationData)
  })
    .then(response => {
      console.log('Fetch response received', response);

      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      console.log('Response JSON data:', data);
      messageDiv.textContent = `Thank you, ${registrationData.name}! You registered for "${registrationData.event}".`;
      messageDiv.className = 'success';
      messageDiv.classList.remove('hidden');
      form.reset();
    })
    .catch(error => {
      console.error('Fetch error:', error);
      messageDiv.textContent = `Registration failed: ${error.message}`;
      messageDiv.className = 'error';
      messageDiv.classList.remove('hidden');
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
});

// Helper functions

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
