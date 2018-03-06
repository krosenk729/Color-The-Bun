const sql = require('mysql');
let connection;
if (process.env.JAWSDB_URL){
	connection = sql.createConnection(process.env.JAWSDB_URL);
} else {
	connection = sql.createConnection({
		host: 'gp96xszpzlqupw4k.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
		port: '3306',
		user: 'koxpjng87fqm37ln',
		password: 'gb6zxvyegemharaz'
	});
}

connection.connect((err)=>{
	if(err){
		console.log('error connecting' + err.stack);
	} else {
		console.log('connected as id' + connection.threadId);
		connection.query(`
			CREATE DATABASE IF NOT EXISTS my_database;
			`, (err, data)=>{
				console.log(err);
				console.log(data);
			});
	}
});
