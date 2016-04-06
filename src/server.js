import Server from 'socket.io'
import { deleteUser, addUser } from '../db/rethink'
import { updateUsers } from '../index'

export function startServer(store) {
	const io = new Server().attach(8090)

	store.subscribe(
		() => io.emit('state', store.getState().toJS())
	)

	io.on('connection', (socket) => {
		socket.emit('state', store.getState().toJS())

		socket.on('action', (state) => {
			console.log(JSON.stringify(state))

			switch (state.type) {
				case 'DELETE_USER':
					deleteUser(state.user_id, updateUsers);
					break;
				case 'ADD_USER':
					addUser(state.user, updateUsers);
					break;
				default:
					store.dispatch(state);
			}
		});

		updateUsers();		
	});
}

function dispatch(store, state) {
	store.dispatch(state)
}