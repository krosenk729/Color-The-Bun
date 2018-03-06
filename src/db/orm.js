const connection = require('./connection');
const ORM = function() {
	this.fetchColors = function(callback){
		connection.query(`
			SELECT * 
			FROM jdjkhrjps1cgj89h.bun_colors
			ORDER BY id;`, 
			function(err, data){
				callback(err, data);
			});
	}

	this.fetchColor = function(colorId, callback){
		connection.query(`
			SELECT * 
			FROM jdjkhrjps1cgj89h.bun_colors
			WHERE id = ?;`,
			[colorId],
			function(err, data){
				callback(err, data);
			});
	}

	this.addColor = function(color, callback){
		connection.query(`
			INSERT INTO jdjkhrjps1cgj89h.bun_colors (color)
			VALUES (?);`, 
			[color],
			function(err, data){
				callback(err, data);
			});
	}

	this.updateColor = function(colorId, colorCol, colorVal, callback){
		connection.query(`
			UPDATE jdjkhrjps1cgj89h.bun_colors
			SET ?? = ?
			WHERE id = ?`,
			[colorCol, colorVal, colorId],
			function(err, data){
				callback(err, data);
			});
	}

	this.removeColor = function(colorId, callback){
		connection.query(`
			DELETE FROM jdjkhrjps1cgj89h.bun_colors
			WHERE id = ?`,
			[colorId],
			function(err, data){
				callback(err, data);
			});
	}

}

module.exports = ORM;