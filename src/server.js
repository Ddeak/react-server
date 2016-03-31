import Server from 'socket.io'
import { addUser, deleteUser } from './core'

export function startServer(store) {
	const io = new Server().attach(8090)

	store.subscribe(
		() => io.emit('state', store.getState().toJS())
	)

	io.on('connection', (socket) => {
		socket.emit('state', store.getState().toJS())

		socket.on('action', (state) => {
			console.log(JSON.stringify(state))
			store.dispatch(state)
		})
	})
}