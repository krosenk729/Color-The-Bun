const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');

// Middleware
// ===========================================================
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static( path.join(__dirname, 'public') ));

// exphbs.registerPartial(__dirname + '/src/views/partials');
app.engine('handlebars', exphbs({
	extname: 'handlebars', 
	defaultLayout: 'main', 
	layoutsDir: __dirname + '/src/views/layouts/',
	partialsDir: __dirname + '/src/views/partials/'
}));
app.set('views', path.join(__dirname + '/src/views'));
app.set('view engine', 'handlebars');

// Serve Views
// ===========================================================
const routes = require('./src/routes/routes');
app.use('/', routes);

// Listener
// ===========================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

