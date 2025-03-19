let scrollSpeed = 1; // Pixels per step
let scrollInterval = 50; // Time between steps (milliseconds)
let scrollIntervalId;
let userInteracted = false;

function autoScroll() {
    window.scrollBy(0, scrollSpeed,);
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        clearInterval(scrollIntervalId); // Stop when reaching the bottom
        }
}

function startAutoScroll() {
    scrollIntervalId = setInterval(autoScroll, scrollInterval);
}

// Start auto-scroll initially
startAutoScroll();

// Stop auto-scroll when user interacts
window.addEventListener('wheel', () => {
    userInteracted = true;
    clearInterval(scrollIntervalId);
});

window.addEventListener('touchstart', () => {
    userInteracted = true;
    clearInterval(scrollIntervalId);
});