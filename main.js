const pages = [
    "index.html",
    "contact.html",
    "a-propos.html"
]

setTimeout(e => {
    document.querySelector('body').classList.remove('hidden')
}, 0)

let url_active = document.location.href
let segments = url_active.split('/')
let lastSegment = segments[segments.length - 1];
let page_active = lastSegment
//console.log('page active : ' + page_active)
let pageIndex = pages.indexOf(page_active)
//console.log('page index : ' + pageIndex)
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

//console.log('previous : ' + pagePrevious)
//console.log("Next : " + pageNext)

//* Swipe
let startX; // Coordonnée X du point de départ du geste
let startY; // Coordonnée Y du point de départ du geste
let i = 0

document.addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    

});

document.addEventListener('touchmove', function(event) {
    document.querySelector('body').style.opacity = 0.5
    document.querySelector('body').style.color = 'red'
    let changeX = event.changedTouches[0].clientX
    if (changeX > startX) {
        console.log('droite')
        document.querySelector('.droite').classList.remove('hidden')
        document.querySelector('.gauche').classList.add('hidden')
    } else {
         console.log('gauche')
         document.querySelector('.gauche').classList.remove('hidden')
         document.querySelector('.droite').classList.add('hidden')
    }

});
 

document.addEventListener('touchend', function(event) {
    document.querySelector('body').style.opacity = 1
    document.querySelector('body').style.color = 'black'
    let endX = event.changedTouches[0].clientX;
    let endY = event.changedTouches[0].clientY;

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
