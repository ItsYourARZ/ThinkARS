let scrollSpeed = 2;
let scrollInterval = 50;
let scrollIntervalId;
let userInteracted = false;

function autoScroll() {
    window.scrollBy(0, scrollSpeed,);
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        clearInterval(scrollIntervalId);
        }
}

function startAutoScroll() {
    scrollIntervalId = setInterval(autoScroll, scrollInterval);
}

startAutoScroll();

window.addEventListener('wheel', () => {
    userInteracted = true;
    clearInterval(scrollIntervalId);
});

window.addEventListener('touchstart', () => {
    userInteracted = true;
    clearInterval(scrollIntervalId);
});