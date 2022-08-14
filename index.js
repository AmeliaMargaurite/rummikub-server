const WebSocket = require("ws");
const express = require("express");
const http = require("http");

// https://lekkimworld.com/2017/11/16/websockets-in-an-express-node-js-app-on-heroku/

const PORT = process.env.PORT || 9000;
const app = express();

const httpServer = http.createServer(app);
const wssServer = new WebSocket.Server({
	server: httpServer,
});
httpServer.listen(PORT);

wssServer.on("connection", function (ws) {
	console.log("meep");
	ws.on("message", function (msg) {
		console.log(msg);
		wssServer.clients.forEach(function each(client) {
			if (client.readyState === WebSocket.OPEN) {
				client.send(msg.toString());
			}
		});
	});
});

app.on("upgrade", async function upgrade(request, socket, head) {
	// math.random to reject half? maybe just a section to set up own reject scenario

	wssServer.handleUpgrade(request, socket, head, function done(ws) {
		wssServer.emit("connection", ws, request);
	});
});
