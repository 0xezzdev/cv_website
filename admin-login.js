// Add login button to CV website
document.addEventListener('DOMContentLoaded', function() {
  // Create login button element
  const loginButton = document.createElement('a');
  loginButton.href = 'https://cv-admin-dashboard-production.up.railway.app';
  loginButton.target = '_blank';
  loginButton.className = 'admin-login-btn';
  loginButton.textContent = 'Admin Login';
  
  // Style the button
  loginButton.style.position = 'fixed';
  loginButton.style.bottom = '20px';
  loginButton.style.right = '20px';
  loginButton.style.padding = '10px 15px';
  loginButton.style.backgroundColor = '#4a148c';
  loginButton.style.color = 'white';
  loginButton.style.borderRadius = '5px';
  loginButton.style.textDecoration = 'none';
  loginButton.style.fontWeight = 'bold';
  loginButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
  loginButton.style.zIndex = '1000';
  
  // Add hover effect
  loginButton.onmouseover = function() {
    this.style.backgroundColor = '#6a1b9a';
  };
  loginButton.onmouseout = function() {
    this.style.backgroundColor = '#4a148c';
  };
  
  // Add to the body
  document.body.appendChild(loginButton);
});
