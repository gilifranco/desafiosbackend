const socket = io();

socket.on('messages', (data) => {
	const html = data.map((msj) => {
	return `<div>
				<strong>${msj.author.name}</strong>
				<strong>${msj.fyh}</strong>
				<em>${msj.text}</em>
			</div>`;
		})
		.join(' ');

	document.getElementById('messages').innerHTML = html;
});

function addMessage() {
	const message = {
		author: {
			name: document.getElementById('name').value,
		},
		text: document.getElementById('text').value,
	};
	socket.emit('new-message', message);
	// return false
}