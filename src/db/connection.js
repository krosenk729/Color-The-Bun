const sql = require('mysql');
let connection;
if (process.env.JAWSDB_URL){
	connection = sql.createConnection(process.env.JAWSDB_URL);
} else {
	connection = sql.createConnection({
		host: 'localhost',
		port: '3306',
		user: 'root',
		password: 'password1',
		database: 'jdjkhrjps1cgj89h'
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
