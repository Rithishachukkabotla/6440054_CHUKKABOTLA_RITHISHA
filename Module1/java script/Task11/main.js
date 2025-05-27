const form = document.getElementById('registration-form');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Clear previous errors
  clearErrors();
  successMessage.classList.add('hidden');
  successMessage.textContent = '';

  // Access form elements
  const { name, email, event: selectedEvent } = form.elements;

  let hasErrors = false;

  // Validate name
  if (!name.value.trim()) {
    setError(name, 'Name is required');
    hasErrors = true;
  }

  // Validate email (simple pattern check)
  if (!email.value.trim()) {
    setError(email, 'Email is required');
    hasErrors = true;
  } else if (!validateEmail(email.value.trim())) {
    setError(email, 'Email is invalid');
    hasErrors = true;
  }

  // Validate event selection
  if (!selectedEvent.value) {
    setError(selectedEvent, 'Please select an event');
    hasErrors = true;
  }

  if (!hasErrors) {
    // Form is valid, show success message
    successMessage.textContent = `Thank you, ${name.value.trim()}! You have registered for "${selectedEvent.value}".`;
    successMessage.classList.remove('hidden');

    // Optionally, clear form
    form.reset();
  }
});

// Helper to set error message below input/select
function setError(inputElement, message) {
  const formGroup = inputElement.parentElement;
  const errorMsg = formGroup.querySelector('.error-message');
  errorMsg.textContent = message;
}

// Clear all error messages
function clearErrors() {
  const errors = form.querySelectorAll('.error-message');
  errors.forEach(el => el.textContent = '');
}

// Basic email format validation
function validateEmail(email) {
  // Simple regex for demo; consider more robust validation if needed
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
