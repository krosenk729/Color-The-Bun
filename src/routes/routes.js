const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

// Body Parser
// ===========================================================
app.use(bodyParser.json());
const parseUrlencoded = bodyParser.urlencoded({extended: false});

// ORMs
// ===========================================================
const ORM = require('../db/orm');
const orm = new ORM();

// Get or Add Data 
// ===========================================================

router.route('/colors')
.get(function(req, res){
	orm.fetchColors((err, data)=>{
		if(err){ return res.status(500).send('Whoops').end()}
		res.json(data);
	});
})
.post(function(req, res){
	if(!req.body.color){ return res.send('Nope'); }
	orm.addColor(req.body.color, (err, data)=>{
		if(err){ return res.status(500).send('Whoops').end()}
		// res.redirect('/');
		res.json(data['insertId']);
	});
});

// Update or Delete by ID
// ===========================================================

router.route('/colors/:id')
.get(function(req, res){
	orm.fetchColor(req.params.id, (err, data)=>{
		if(err){ return res.status(500).send('Whoops').end()}
		res.json(data);
	});
})
.put(function(req, res){
	if(!req.body.bunned){ return res.send('Nope'); }
	orm.updateColor(req.params.id, 'bunned', req.body.bunned, (err, data)=>{
		if(err){
			return res.status(500).send('Whoops').end();
		} else if (data.changedRows === 0){
			return res.status(404).send('No thank you').end();
		}
		console.log(data);
		return res.status(200).send('Yuppers').end();
	});
})
.delete(function(req, res){
	orm.removeColor(req.params.id, (err, data)=>{
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
	orm.fetchColors((err, data)=>{
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