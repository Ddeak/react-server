import { List, Map } from 'immutable'

export const INITIAL_STATE = Map();

export function addUser(state, action) {
	console.log("before: " + JSON.stringify(state))
	if (!state.get('users') || state.get('users') === 'undefined') {
		state = state.set('users', List())
	}

	const users = state.get('users').unshift(action.user)
	return state.set('users', users)
}

export function deleteUser(state, action) {
	const users = state.get('users').delete(action.user_id)
	return state.set('users', users)
}