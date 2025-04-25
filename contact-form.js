// Updated contact form for cross-domain requests
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');
      
      // Create status message element if it doesn't exist
      let statusMessage = document.getElementById('form-status');
      if (!statusMessage) {
        statusMessage = document.createElement('div');
        statusMessage.id = 'form-status';
        contactForm.appendChild(statusMessage);
      }
      
      // Validate inputs
      if (!name.value || !email.value || !subject.value || !message.value) {
        statusMessage.textContent = 'Please fill in all fields';
        statusMessage.className = 'error-message';
        return;
      }
      
      // Show loading message
      statusMessage.textContent = 'Sending message...';
      statusMessage.className = 'info-message';
      
      // Prepare message data
      const messageData = {
        sender_name: name.value,
        sender_email: email.value,
        subject: subject.value,
        content: message.value
      };
      
      // Send message to admin dashboard API with full URL for cross-domain request
      fetch('https://cv-admin-dashboard-production.up.railway.app/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://ezzeldeenmohamed-cv.netlify.app'
        },
        body: JSON.stringify(messageData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.message === 'Message sent successfully' || data.messageId) {
          // Show success message
          statusMessage.textContent = 'Message sent successfully! I will respond to you soon.';
          statusMessage.className = 'success-message';
          
          // Clear form
          name.value = '';
          email.value = '';
          subject.value = '';
          message.value = '';
        } else {
          // Show error message
          statusMessage.textContent = 'Failed to send message. Please try again.';
          statusMessage.className = 'error-message';
        }
      })
      .catch(error => {
        console.error('Error sending message:', error);
        statusMessage.textContent = 'An error occurred. Please try again later.';
        statusMessage.className = 'error-message';
      });
    });
  }
});
