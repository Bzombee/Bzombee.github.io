let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

// Function to show a specific slide
function showSlide(index) {
    if (index >= slides.length) { slideIndex = 0; }
    if (index < 0) { slideIndex = slides.length - 1; }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Show the current slide
    slides[slideIndex].style.display = "block";
}

// First show the first slide
showSlide(slideIndex);

// Function to move slides
function changeSlide(n) {
    slideIndex += n;
    showSlide(slideIndex);
}

// Auto-advance every 5 seconds (you can remove this if you only want manual buttons)
setInterval(() => {
    changeSlide(1);
}, 5000);
