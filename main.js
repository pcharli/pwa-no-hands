const pages = [
    "index.html",
    "contact.html",
    "a-propos.html"
]

setTimeout(e => {
    document.querySelector('body').classList.remove('hidden')
}, 500)

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

    if (startX - endX > 50 && Math.abs(startY - endY) < 20 && pageNext) {
        // Le geste est un swipe vers la gauche
        //alert("Swipe vers la gauche détecté")
        document.location.href = pageNext
    }
    else if (endX - startX > 50 && Math.abs(startY - endY) < 20 && pagePrevious) {
        //alert("Swipe vers la droite détecté")
        document.location.href = pagePrevious
    }
});

//* end swipe

/* test scroll */
const linkScroll = document.querySelector('.scroll a')
if(linkScroll) {
linkScroll.addEventListener('click', e => {
    e.preventDefault()
    window.scrollBy(0,500)
}) 
}

// end test scroll

// test deviceorientation
window.addEventListener('deviceorientation', handleOrientation);

function handleOrientation(event) {
  var alpha = event.alpha; // Orientation en degrés par rapport à l'axe Z
  var beta = event.beta; // Inclinaison en degrés par rapport à l'axe X
  var gamma = event.gamma; // Inclinaison en degrés par rapport à l'axe Y

  //alert('gamma : ' + gamma)
  //alert('beta' + beta)
  if(gamma <= -50 && pageNext) {
    //alert('page next')
    document.location.href = pageNext
  }
  if(gamma >= 50 && pagePrevious) {
    //alert('page previous')
    document.location.href = pagePrevious
  }
  if(beta <= -30) {
    window.scrollBy(0,150)
  }
  if(beta >= 30) {
    window.scrollBy(0,-150)
  }
}
