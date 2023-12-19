// Connect to WebSocket server
const ws = new WebSocket('ws://localhost:8080');

// Update the click counter when a message is received from the server
ws.onmessage = function(event) {
    clickCounterElement.innerText = `The Mango has ${event.data} followers`;
};

const mangoImage = document.getElementById('mango-image');
const clickCounterElement = document.getElementById('click-counter');

// Existing click event logic
mangoImage.addEventListener('click', function() {
    ws.send('click'); // Send 'click' message to WebSocket server

    // Add jiggle class temporarily
    mangoImage.classList.add('jiggle');

    // Remove the class after the animation completes
    setTimeout(() => {
        mangoImage.classList.remove('jiggle');
    }, 300);
});
