let darkMode = false;

function switchPage(pageId) {
    const pages = document.getElementsByClassName('page');
    for (let page of pages) {
        if(page.classList.contains('show')){
            page.classList.remove('show');
            page.classList.add('hide');
        }
    }
    setTimeout(function(){
        for (let page of pages) {
            page.classList.remove('show');
            page.classList.remove('hide');
        }
        document.getElementById(pageId).classList.add('show');
    }, 500);
}

function toggleDarkMode() {
    darkMode = !darkMode;
    if (darkMode) {
        document.documentElement.style.setProperty('--background-color', 'rgba(17, 17, 27, 1)');
        document.documentElement.style.setProperty('--text-color', 'rgba(205, 214, 244, 1)');
        document.documentElement.style.setProperty('--h1-color', 'rgba(243, 139, 168, 1)');
        document.documentElement.style.setProperty('--nav-background-color', 'rgba(180, 190, 254, 1)');
        document.documentElement.style.setProperty('--nav-text-color', 'rgba(0, 0, 0, 1)');
        document.documentElement.style.setProperty('--nav-hover-background-color', 'rgba(0, 0, 0, 1)');
        document.documentElement.style.setProperty('--nav-hover-text-color', 'rgba(255, 255, 255, 1)');
    } else {
        document.documentElement.style.setProperty('--background-color', 'rgba(255, 255, 255, 1)');
        document.documentElement.style.setProperty('--text-color', 'rgba(0, 0, 0, 1)');
        document.documentElement.style.setProperty('--h1-color', 'rgba(243, 139, 168, 1)');
        document.documentElement.style.setProperty('--nav-background-color', 'rgba(49, 50, 68, 1)');
        document.documentElement.style.setProperty('--nav-text-color', 'rgba(205, 214, 244, 1)');
        document.documentElement.style.setProperty('--nav-hover-background-color', 'rgba(221, 221, 221, 1)');
        document.documentElement.style.setProperty('--nav-hover-text-color', 'rgba(0, 0, 0, 1)');
    }
}

switchPage('home');

document.getElementById("paragraphWidth").oninput = function() {
    document.documentElement.style.setProperty('--p-width', this.value + 'px');
    document.documentElement.style.setProperty('--p-margin', (window.innerWidth - this.value) / 2 + 'px');
}

var leafLimit = 100;
var leafCount = 0;
var initialInterval = 500;
var maxInterval = 5000;
var interval = initialInterval;

function addLeaf() {
    if (leafCount < leafLimit) {
        var newLeaf = document.createElement('div');
        newLeaf.classList.add('leaf');

        // Apply random size and color to each leaf
        if (Math.random() > 0.5) newLeaf.classList.add('big');
        if (Math.random() > 0.5) newLeaf.classList.add('green');
        else newLeaf.classList.add('yellow');

        // Append to container to calculate offset width
        var container = document.getElementById('jungle-container');
        container.appendChild(newLeaf);

        // Randomly position the leaf on the sides of the screen
        var side = Math.random() > 0.5 ? 0 : window.innerWidth;
        newLeaf.style.left = side - newLeaf.offsetWidth + 'px';
        newLeaf.style.top = Math.random() * window.innerHeight + 'px';

        leafCount++;

        // Gradually increase interval, capped at maxInterval
        if (interval < maxInterval) {
            interval *= 1.05;
        }

        setTimeout(addLeaf, interval);
    }
}

setTimeout(addLeaf, interval);


window.onscroll = function() {
    var bodyHeight = document.body.scrollHeight - innerHeight;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var percent = scrollTop / bodyHeight * 100;
    document.getElementById('progress-bar').style.width = percent + '%';
}
