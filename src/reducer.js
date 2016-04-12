import { allUsers, INITIAL_STATE_LIST } from './core'
import { combineReducers } from 'redux'

function users(state = INITIAL_STATE_LIST, action) {
	switch (action.type) {
		case 'ALL_USERS':
			return allUsers(state, action)
		default:
			return state
	}
}

const rootReducer = combineReducers({
	users
})

export default rootReducer