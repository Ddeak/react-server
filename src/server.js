import Server from 'socket.io'
import { updateUsers } from '../index'
import { handle } from './requestHandler'

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
				handle(action);
			}
		);

		updateUsers();		
	});
}