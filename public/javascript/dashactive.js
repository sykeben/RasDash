//////////////////////////////////////////////////
// RASDASH DASH PAGE UPDATER (C)2019: Ben Sykes //
//////////////////////////////////////////////////

// Update counter.
var pageUpdateCounter = 0;

// Navbar link status updater.
function updatePage() {
    
    pageUpdateCounter += 1;
    
    const links = document.getElementsByName('page-link');
    
    for (var i=0; i<links.length; i++) {
        if (links[i].getAttribute('data-href') == window.location.href.split(window.location.host)[1]) {
            $('#page-link-' + i.toString()).addClass('active');
        }
    }
    
    if (pageUpdateCounter > 3) {
        window.clearInterval(updatePage);
    }
}

// Make it update upon loading.
window.onload = updatePage;

// Have it update every second for 3 seconds.
window.setInterval(updatePage, 1000);
