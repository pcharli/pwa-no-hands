const pages = [
    "index.html",
    "contact.html",
    "a-propos.html"
]

let url_active = document.location.href
let segments = url_active.split('/')
let lastSegment = segments[segments.length - 1];
let page_active = lastSegment
console.log('page active : ' + page_active)
let pageIndex = pages.indexOf(page_active)
console.log('page index : ' + pageIndex)
let pageNext = null
let pagePrevious = null
switch(pageIndex) {
    case 0 :
        pageNext = pages[pageIndex+1]
        pagePrevious = null
        break
    case pages.length-1 :
        pageNext = null
        pagePrevious = pages[pageIndex-1]
        break
    default :
    pageNext = pages[pageIndex+1]
    pagePrevious = pages[pageIndex-1]
}

console.log('previous : ' + pagePrevious)
console.log("Next : " + pageNext)

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

    if (startX - endX > 50 && Math.abs(startY - endY) < 20 && pagePrevious) {
        // Le geste est un swipe vers la gauche
        //alert("Swipe vers la gauche détecté")
        document.location.href = pagePrevious
    }
    else if (endX - startX > 50 && Math.abs(startY - endY) < 20 && pageNext) {
        //alert("Swipe vers la droite détecté")
        document.location.href = pageNext
    }
});

//* end swipe