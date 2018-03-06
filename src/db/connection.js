const sql = require('mysql');
if (process.env.JAWSDB_URL){
	const connection = sql.createConnection(process.env.JAWSDB_URL);
} else {
	const connection = sql.createConnection({
		host: 'localhost',
		port: '3306',
		user: 'root',
		password: 'password1',
		database: 'my_database'
	});
}

connection.connect((err)=>{
	if(err){
		console.log('error connecting' + err.stack);
	} else {
		console.log('connected as id' + connection.threadId);
	}
});

module.exports = connection;
