import Server from 'socket.io'
import { updateUsers } from '../index'
var Users = require('gp-db-models').Users


export function startServer(store) {
	const io = new Server().attach(8090)

	store.subscribe(
		() => {
			io.emit('state', store.getState())
		}
	)

	io.on('connection', (socket) => {
		socket.emit('state', store.getState())

		socket.on('action', (action) => {
			switch (action.type) {
				case 'ADD_USER':
					Users.add(action.user)
					break;
				case 'DELETE_USER':
					Users.delete(action.user_id);
					break;
				default:
					store.dispatch(state);
			}
		});

		updateUsers();		
	});
}