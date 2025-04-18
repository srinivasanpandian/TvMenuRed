document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.click-button');
    
    button.addEventListener('click', function() {
        // Change button text to "Clicked"
        button.textContent = 'Clicked';
        
        // Add a class to style the clicked state
        button.classList.add('clicked');
    });
}); 