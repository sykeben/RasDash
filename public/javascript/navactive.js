////////////////////////////////////////////
// RASDASH NAV UPDATER (C)2019: Ben Sykes //
////////////////////////////////////////////

// Update counter.
var navUpdateCounter = 0;

// Navbar link status updater.
function updateNav() {
    
    navUpdateCounter += 1;
    var currentPath = window.location.href.split(window.location.host)[1];
    
    const links = document.getElementsByName('nav-link');
    
    if (currentPath.split('/')[1] == 'dash') {
        $('#nav-link-0').addClass('active');
    } else {
        for (var i=0; i<links.length; i++) {
            if (links[i].getAttribute('href') == currentPath) {
                $('#nav-link-' + i.toString()).addClass('active');
            }
        }
    }
    
    if (navUpdateCounter > 3) {
        window.clearInterval(updateNav);
    }
}

// Make it update upon loading.
window.onload = updateNav;

// Have it update every second for 3 seconds.
window.setInterval(updateNav, 1000);
