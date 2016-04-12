import { Users } from 'gp-db-models'

export function handle(action) {
	switch (action.type) {
		case 'ADD_USER':
			Users.add(action.user)
			break
		case 'DELETE_USER':
			Users.delete(action.user_id)
			break
		default:
			return
	}
}