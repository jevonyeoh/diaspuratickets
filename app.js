var express = require('express'), 
	http = require('http'),
	MongoClient = require('mongodb').MongoClient;

//var MONGOHQ_URL="mongodb://user:pass@server.mongohq.com:port_name/db_name"
var MONGOHQ_URL="mongodb://jevon:a62c637ffca71b9b7587214b45a9714b@dharma.mongohq.com:10038/app17077512";

var app = express();

var id = 0;

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

app.get('/new', function(req, res) {
	//res.render("new_order");
	return res.render('home');
});

app.all('/purchased', function(req, res) {
	var search = req.param('searchword') || 0;
	var query = {};

	if (search) {
		query.name = {$regex: search};
		query.name.$options = 'i';
	}

	return res.render('home');

	/*
	//MongoClient.connect('mongodb://127.0.0.1:27017/tickets', function(err, db) {
	MongoClient.connect(MONGOHQ_URL, function(err, db) {
		if(err) throw err;

	    var ordersc = db.collection('orders');
	    ordersc.find(query).toArray(function(err, docs) {
	    	return res.render("purchased", {
	    		docs: docs
	    	});
	    });	
  	});
*/
});

app.post('/edit', function(req, res) {
	return res.render('edit');
});

app.post('/createorder', function(req, res) {
	return res.render('home');
	
	var name = req.param('username');
	var	numtickets = req.param('numtickets');
	var	price = req.param('price');
	var	remarks = req.param('remarks');
	var paid = req.param('paid');


/*
	//MongoClient.connect('mongodb://127.0.0.1:27017/tickets', function(err, db) {
	MongoClient.connect(MONGOHQ_URL, function(err, db) {
		if(err) throw err;

	    var ordersc = db.collection('orders');
	    ordersc.insert({name: name, numtickets: numtickets, price: price, remarks: remarks, paid:paid, id:id}, function(err, docs) {
	    	db.close();
	    	id++;
	    	return res.redirect('/purchased');
	    });
  	});
*/
});

app.listen(3000);
console.log('Express server listening on port 3000');

