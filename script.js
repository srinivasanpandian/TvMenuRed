function startSlideshow() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let isTransitioning = false;

    function showNextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        // Get current and next slide
        const current = slides[currentSlide];
        currentSlide = (currentSlide + 1) % slides.length;
        const next = slides[currentSlide];

        // Add previous class to current slide
        current.classList.add('previous');
        current.classList.remove('active');

        // Add active class to next slide
        next.classList.add('active');

        // Reset transition lock and remove previous class after animation
        setTimeout(() => {
            current.classList.remove('previous');
            isTransitioning = false;
        }, 500); // Match this with CSS transition time
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

    // Change slide every 10 seconds
    setInterval(showNextSlide, 10000);
}

// Start the slideshow when the page loads
document.addEventListener('DOMContentLoaded', startSlideshow); 