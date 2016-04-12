import makeStore from './src/store'
import { startServer } from './src/server'
import { Users } from 'gp-db-models'

export const store = makeStore();
startServer(store);

Users.subscribe(updateUsers);
export function updateUsers() {
	Users.get_all(function(data) {
	 	store.dispatch({
	 		type: 'ALL_USERS',
	 		users: data
	 	});
	 });
}

console.log("Server Started Successfully!")