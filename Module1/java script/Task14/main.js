$(document).ready(function() {
  // Handle click event on Register button using jQuery
  $('#registerBtn').click(function() {
    console.log('Register button clicked');

    // Toggle visibility of event card with fadeIn/fadeOut
    if ($('#eventCard').is(':visible')) {
      $('#eventCard').fadeOut(600);
    } else {
      $('#eventCard').fadeIn(600);
    }
  });
});
