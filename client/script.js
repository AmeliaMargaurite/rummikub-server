// WebSocket variables
const url = "ws://192.168.1.159:9876";
const myWSServer = new WebSocket(url);

const myMessages = document.getElementById("messages");
const myInput = document.getElementById("message");
const sendBtn = document.getElementById("send");
console.log(myInput);
const sendMsg = () => {
	const text = myInput.value;
	msgGeneration(text, "Client");
	myWSServer.send(text);
};

const msgGeneration = (msg, from) => {
	const newMessage = document.createElement("h4");
	newMessage.innerHTML = `${from} says: ${msg}`;
	myMessages.appendChild(newMessage);
};

myWSServer.onopen = () => (sendBtn.disabled = false);

myWSServer.onmessage = (e) => {
	const { data } = e;
	msgGeneration(data, "Server");
};

sendBtn.disabled = true;
sendBtn.addEventListener("click", sendMsg, false);
