var r = require('rethinkdbdash')({
	port: 28016,
	host: 'localhost',
	db: 'GoodAdmin'
});

export function create_table(table) {
	r.tableCreate(table,{ primaryKey: 'surname' })
	.run()
	.then(function(response){
		console.log(response)
	})
	.error(function(err){
		console.log('error while creating table ',err)
	})
}

export function insert(table, forename, surname) {
	r.table(table)
	.insert({
		email: "daniel_deak@live.com",
	    forename: forename,
	    surname: surname,
	    company: "GoodPractice"
	})
	.run()
	.then(function(response){
		console.log('Success ',response);
	})
	.error(function(err){
		console.log('error occurred ',err);
	})
}

export function get(table, callback) {
	r.table('User')
	.run()
	.then(function(response){
		callback(response)
	})
	.error(function(err){
		console.log(err);
		return null;
	})
}

export function subscribe_to_changes(table, store) {
	console.log("here")
	r.table('User')
	.changes()
	.run()
	.then(function(cursor){
		cursor.each(temp(store))
	})
	.error(function(err){
		console.log(err);
	});
}

export function deleteUser(user, callback) {
	r.table('User')
	.get(user)
	.delete()
	.then(function(response){
		callback(response)
	})
	.error(function(err){
		console.log(err);
		return null;
	})
}

export function addUser(user, callback) {
	r.table('User')
	.insert(user)
	.run()
	.then(function(response){
		callback(response)
	})
	.error(function(err){
		console.log(err);
		return null;
	})
}

function temp(store) {
	get('User', function(data) {
		store.dispatch({
			type: 'ALL_USERS',
			users: data
		})
	})
}
