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
