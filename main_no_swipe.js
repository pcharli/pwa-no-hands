const pages = [
    "index.html",
    "contact.html",
    "a-propos.html"
]

let test = window.orientation
console.log("test : "+ test)

setTimeout(e => {
    document.querySelector('body').classList.remove('hidden')
}, 0)

//recup url d'un fichier
let url_active = document.location.href
// spliter sur le slash
let segments = url_active.split('/')
//recupérer la dernière entrée de l'array qui contient le nom du fichier
let page_active = segments[segments.length - 1]

//console.log('page active : ' + page_active)
//récupérer l'index de l'array correspondant à la page active
let pageIndex = pages.indexOf(page_active)
//console.log('page index : ' + pageIndex)

//deux variables sur null
let pageNext = null
let pagePrevious = null
// y-a-t-il une page avant ou après
switch(pageIndex) {
    case 0 : //première page ?
        pageNext = pages[pageIndex+1] //page suivante = index de pageactive +1
        pagePrevious = null //pas de page précédente
        break
    case pages.length-1 : //dernière page ?
        pageNext = null //pas de page suivante
        pagePrevious = pages[pageIndex-1] //page précédente = index de pageactive -1
        break
    default : //sinon
        pageNext = pages[pageIndex+1] //page suivante = index de pageactive +1
        pagePrevious = pages[pageIndex-1] //page précédente = index de pageactive -1
}

//console.log('previous : ' + pagePrevious)
//console.log("Next : " + pageNext)




// test deviceorientation
window.addEventListener('deviceorientation', handleOrientation);

function handleOrientation(event) {
  //let alpha = event.alpha; // Orientation en degrés par rapport à l'axe Z
  let beta = event.beta; // Inclinaison en degrés par rapport à l'axe X
  let gamma = event.gamma; // Inclinaison en degrés par rapport à l'axe Y

  //alert('gamma : ' + gamma)
  //alert('beta' + beta)

  //penche-ton vers la gauche  d'au moins 50°?
  if(gamma <= -50 && pageNext) {
    //alert('page next')
    document.location.href = pageNext
  }
   // penche-ton vers la droite  d'au moins 50°?
  if(gamma >= 50 && pagePrevious) {
    //alert('page previous')
    document.location.href = pagePrevious
  }
   // penche-ton vers l'avant  d'au moins 30°?
  if(beta <= -30) {
    window.scrollBy(0,150) //on sroll vers la bas
  }
   // penche-ton vers l'arrière d'au moins 30°?
  if(beta >= 30) {
    window.scrollBy(0,-150) //on scroll vers le haut
  }
}

let startX = null
let endX = null
let actualX = null

window.addEventListener('touchstart', e => {
  startX = e.touches[0].pageX
})

window.addEventListener('touchmove', e => {  
  actualX = e.changedTouches[0].pageX
  if(actualX - startX > 30 && pagePrevious) {
    //console.log('Vers la droite')
    document.querySelector('.droite').classList.remove('hidden')
    document.querySelector('.gauche').classList.add('hidden')
  }
  if(startX - actualX > 30 && pageNext) {
    //console.log('Vers la gauche')
    document.querySelector('.gauche').classList.remove('hidden')
    document.querySelector('.droite').classList.add('hidden')
  }

})
window.addEventListener('touchend', e => {
  //console.log(e)
  endX = e.changedTouches[0].pageX
  if (startX < endX && pagePrevious) {
    //console.log('Vers la droite')
    document.location.href = pagePrevious
  } else if(endX < startX && pageNext) {
    //console.log('Vers la gauche')
    document.location.href = pageNext
  }
})
