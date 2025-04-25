// Update the contact form in the main CV website to send messages to the admin dashboard
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');
      const statusMessage = document.getElementById('form-status');
      
      // Validate inputs
      if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
        statusMessage.textContent = 'Please fill in all fields';
        statusMessage.className = 'error-message';
        return;
      }
      
      // Prepare message data
      const messageData = {
        sender_name: nameInput.value,
        sender_email: emailInput.value,
        subject: subjectInput.value,
        content: messageInput.value
      };
      
      // Send message to admin dashboard API
      fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Message sent successfully') {
          // Show success message
          statusMessage.textContent = 'Message sent successfully! I will respond to you soon.';
          statusMessage.className = 'success-message';
          
          // Clear form
          nameInput.value = '';
          emailInput.value = '';
          subjectInput.value = '';
          messageInput.value = '';
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
