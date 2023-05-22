const pages = [
    "index.html",
    "contact.html",
    "a-propos.html"
]

let url_active = document.location.href
let page_active = url_active.replace("http://localhost:5500/", "")
console.log(page_active)