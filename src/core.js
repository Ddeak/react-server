import { List, Map } from 'immutable'

export const INITIAL_STATE = Map();
export const INITIAL_STATE_LIST = List();

export function allUsers(state, action) {
	return List(action.users)
}

export function addUser(user) {
	return function (dispatch) {
		
	}
}