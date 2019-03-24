function updateNav() {
    const links = document.getElementsByName('link');
    for (var i=0; i<links.length; i++) {
        if (links[i].getAttribute('href') == window.location.href.toString().split(window.location.host)[1]) {
            links[i].setAttribute('class', links[i].getAttribute('class')+' active');
        }
    }
}

window.onload = updateNav;
