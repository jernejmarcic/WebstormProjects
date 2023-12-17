const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let clickCounter = 0;

wss.on('connection', function connection(ws) {
    ws.send(clickCounter.toString()); // Send the current counter value when a new client connects

    ws.on('message', function incoming() {
        clickCounter++;
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(clickCounter.toString());
            }
        });
    });
});
