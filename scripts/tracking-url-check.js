// This script checks for exactly 2 URL parameters and shows an error if not.
document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  console.log(params)
  if ([...params.keys()].length !== 2) {
    showTrackingError();
  }
});

function showTrackingError() {
  // Remove the main tracking content
  const main = document.querySelector('.main');
  if (main) main.innerHTML = '';

  // Create and show error message
  const errorDiv = document.createElement('div');
  errorDiv.style.color = 'red';
  errorDiv.style.fontSize = '1.5rem';
  errorDiv.style.textAlign = 'center';
  errorDiv.style.marginTop = '40px';
  errorDiv.textContent = 'Error: This tracking page requires exactly 2 URL parameters.';
  document.body.appendChild(errorDiv);
}
