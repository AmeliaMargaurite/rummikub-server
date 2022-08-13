const WebSocket = require("ws");
const express = require("express");
const app = express();
const path = require("path");

// app.use("/", express.static(path.resolve(__dirname, "../client")));

// const myServer = app.listen(9876);

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

const wsServer = new WebSocket.Server({
	noServer: true,
});

wsServer.on("connection", function (ws) {
	console.log("meep");
	ws.on("message", function (msg) {
		console.log(msg);
		wsServer.clients.forEach(function each(client) {
			if (client.readyState === WebSocket.OPEN) {
				client.send(msg.toString());
			}
		});
	});
});

app.on("upgrade", async function upgrade(request, socket, head) {
	// math.random to reject half? maybe just a section to set up own reject scenario

	wsServer.handleUpgrade(request, socket, head, function done(ws) {
		wsServer.emit("connection", ws, request);
	});
});

const PORT = process.env.PORT || 9000;
app.listen(PORT);
