const baseUrl = 'http://localhost:8080';

function EliminarProducto(pid) {
	fetch(baseUrl + '/products/' + pid, { method: 'DELETE' });
}

function emptyCart(pid) {
	fetch(baseUrl + '/cart/' + pid, { method: 'DELETE' });
}

function Actualizar(pid) {
	const data = {
		name: document.getElementById('name').value,
		description: document.getElementById('description').value,
		code: document.getElementById('code').value,
		price: document.getElementById('price').value,
		photo: document.getElementById('photo').value,
		stock: document.getElementById('stock').value,
	};

	fetch(baseUrl + '/products/' + pid, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
}

function añadirCarrito(pid, code) {
	fetch(`${baseUrl}/cart`, {
		method: 'POST',
		body: JSON.stringify({ id: pid, code: code }),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
}

function generateOrder(pid) {
	fetch(`${baseUrl}/orders`, {
		method: 'POST',
		body: JSON.stringify({ id: pid }),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
}

