function startSlideshow() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showNextSlide() {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to current slide
        slides[currentSlide].classList.add('active');
    }

    // Show first slide initially
    slides[0].classList.add('active');

    // Change slide every 60 seconds
    setInterval(showNextSlide, 5000);
}

// Start the slideshow when the page loads
document.addEventListener('DOMContentLoaded', startSlideshow); 