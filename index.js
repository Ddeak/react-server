import makeStore from './src/store'
import { startServer } from './src/server'
import { insert, create_table, get } from './db/rethink'

export const store = makeStore();
startServer(store);

var r = require('rethinkdbdash')({
	port: 28016,
	host: 'localhost',
	db: 'GoodAdmin'
});

var table = 'User';

r.table('User')
	.changes()
	.run()
	.then(function(cursor){
		cursor.each(updateUsers)
	})
	.error(function(err){
		console.log(err);
	});

export function updateUsers() {
	get('User', function(data) {
		store.dispatch({
			type: 'ALL_USERS',
			users: data
		})
	})
}

console.log("Server Started Successfully!")