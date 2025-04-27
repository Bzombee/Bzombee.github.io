document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // prevent default form submit
    
    // Gather elements from the form
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const feedback = document.getElementById('formFeedback');

    // Reset feedback styles
    feedback.className = 'hidden';
    feedback.innerText = '';

    // Helper function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Basic validation
    if (!name || !email || !message) {
        feedback.className = 'error';
        feedback.innerText = 'Please fill out all fields.';
        return;
    }
    if (!validateEmail(email)) {
        feedback.className = 'error';
        feedback.innerText = 'Please enter a valid email address.';
        return;
    }

    // Simulated AJAX request
    feedback.className = 'success';
    feedback.innerText = 'Sending...';

    setTimeout(function() {
        // Simulating successful response
        feedback.className = 'success';
        feedback.innerText = 'Your message has been sent successfully!';
        
        // Optionally clear form fields
        document.getElementById('contactForm').reset();
    }, 1000); // 1 second delay to mimic a real request
});


