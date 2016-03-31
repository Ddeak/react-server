import { addUser, deleteUser, INITIAL_STATE } from './core'

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'ADD_USER':
			return addUser(state, action)
		case 'DELETE_USER':
			return deleteUser(state, action)
		default:
			return state
	}
}