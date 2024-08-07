document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');

    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.getElementById('emailForm');
    emailForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const emailInput = document.getElementById('email').value;
        if (validateEmail(emailInput)) {
            alert('Thank you for subscribing!');
            emailForm.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });
    
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }
});

