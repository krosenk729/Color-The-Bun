const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

// Body Parser
// ===========================================================
app.use(bodyParser.json());
const parseUrlencoded = bodyParser.urlencoded({extended: false});

// Database
// ===========================================================
const sql = require('mysql');
const connection = sql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password1',
  database: 'my_database'
});

// Get or Add Data 
// ===========================================================

router.route('/colors')
.get(function(req, res){
	connection.query(`
		SELECT * 
		FROM bun_colors
		ORDER BY id;`, 
		function(err, data){
			if(err){ return res.status(500).send('Whoops').end(); }
			res.json(data);
		});
})
.post(function(req, res){
	if(!req.body.color){ return res.send('Nope'); }
	connection.query(`
		INSERT INTO bun_colors (color)
		VALUES (?);`, 
		[req.body.color],
		function(err, data){
			if(err){
				return res.status(500).send('Whoops').end();
			}
			res.json(data);
		});
});

// Update or Delete by ID
// ===========================================================

router.route('/colors/:id')
.get(function(req, res){
	connection.query(`
		SELECT * 
		FROM bun_colors
		WHERE id = ?;`,
		[req.params.id], 
		function(err, data){
			if(err){ return res.status(500).send('Whoops').end(); }
			res.json(data);
		});
})
.put(function(req, res){
	if(!req.body.bunned){ return res.send('Nope'); }
	console.log(req.body.bunned, req.params.id);

	connection.query(`
		UPDATE bun_colors
		SET bunned = ?
		WHERE id = ?`,
		[req.body.bunned, req.params.id],
		function(err, data){
		if(err){
			console.log(err);
			return res.status(500).send('Whoops').end();
		} else if (data.changedRows === 0){
			return res.status(404).send('No thank you').end();
		}
		console.log(data);
		return res.status(200).send('Yuppers').end();
	});
})
.delete(function(req, res){
	connection.query(`
		DELETE FROM bun_colors
		WHERE id = ?`,
		[req.params.id],
		function(err, data){
		if(err){
			return res.status(500).send('Whoops').end();
		} else if (data.changedRows === 0){
			return res.status(404).send('idk').end();
		}
		return res.status(200).send('Yuppers').end();
	});
});

// Views
// ===========================================================
router.route('/')
.get(function(req, res) {
	connection.query(`
		SELECT * 
		FROM bun_colors
		ORDER BY id;`, 
		function(err, data){
			if(err){ return res.status(500).send('Whoops').end(); }
			res.render('body',{
				title: 'Color that Bun',
				colors: [...data]
			});
		});
});

/*app.get(/^[^(api)]|^[^(images)]|^[^(javascripts)]|^[^(public)]|^[^(styles)]/i, function(req, res){
  res.redirect('/');
});*/

// Export
// ===========================================================
module.exports = router;