var express = require('express'), 
	http = require('http'),
	MongoClient = require('mongodb').MongoClient;

var app = express();

// all environments
// can configure using middleware 
app.configure(function(){
	//app.set('port', process.env.PORT || 3000);
	//set where to get paths from: __dirname is the current directory
	app.use(express.bodyParser());
	app.set('views', __dirname + '/views/');
	//app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'jade');
	//app.set('local messages', true);	
	app.use(app.router);		// custom routes
	app.use(express.static(__dirname + "/public")); // useful for serving up css/img/etc
	// all the middleware is is essentially just a function
	app.use(function(req, res){
		// error catching
		res.send(404, "four - oh - four: page not found!");
	});
});

app.get('/', function(req, res) {
	return res.render("home");
});

app.get('/purchased', function(req, res) {
	MongoClient.connect('mongodb://127.0.0.1:27017/tickets', function(err, db) {
		if(err) throw err;

	    var ordersc = db.collection('orders');
	    ordersc.find().toArray(function(err, docs) {
	    	return res.render("purchased", {
	    		docs: docs
	    	});
	    });	
  	});
});

app.get('/new', function(req, res) {
	res.render("new_order");
});

app.post('/createorder', function(req, res) {
	var name = req.param('username');
	var	numtickets = req.param('numtickets');
	var	price = req.param('price');
	var	remarks = req.param('remarks');
	var paid = req.param('paid');

	MongoClient.connect('mongodb://127.0.0.1:27017/tickets', function(err, db) {
		if(err) throw err;

	    var ordersc = db.collection('orders');
	    ordersc.insert({name: name, numtickets: numtickets, price: price, remarks: remarks, paid:paid}, function(err, docs) {
	    	db.close();
	    	return res.redirect('/');
	    });
  	});
});
