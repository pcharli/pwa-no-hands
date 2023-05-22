const pages = [
    "index.html",
    "contact.html",
    "a-propos.html"
]

let url_active = document.location.href
let page_active = url_active.replace("http://localhost:5500/", "")

console.log(page_active)

//* Swipe
let startX; // Coordonnée X du point de départ du geste
let startY; // Coordonnée Y du point de départ du geste

document.addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});

document.addEventListener('touchend', function(event) {
    var endX = event.changedTouches[0].clientX;
    var endY = event.changedTouches[0].clientY;

    if (startX - endX > 50 && Math.abs(startY - endY) < 20) {
        // Le geste est un swipe vers la gauche
        console.log("Swipe vers la gauche détecté");
    }
});

//* end swipe