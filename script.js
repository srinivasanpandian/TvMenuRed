function startSlideshow() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let isTransitioning = false;

    function showNextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to next slide
        slides[currentSlide].classList.add('active');

        // Reset transition lock after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 1500); // Match this with CSS transition time
    }

    // Preload images for smoother transitions
    function preloadImages() {
        slides.forEach(slide => {
            const src = slide.getAttribute('src');
            const img = new Image();
            img.src = src;
        });
    }

    // Initialize
    preloadImages();
    slides[0].classList.add('active');

    // Change slide every 60 seconds
    setInterval(showNextSlide, 3000);
}

// Start the slideshow when the page loads
document.addEventListener('DOMContentLoaded', startSlideshow); 