//DECLARING VARIABLES
//===========================
var express        = require( 'express' )
var morgan           = require( 'morgan' )
var mongoose           = require( 'mongoose' )
var cors           = require( 'cors' )
var app = express()
var bodyParser           = require( 'body-parser' )
var server = require( 'http' ).Server( app )
var io = require( 'socket.io' )( server )

var Dev = require( './.Dev.js' )
var PORT = Dev.PORT
var DB   = Dev.DB

//DB
//===========================
mongoose.connect( DB )

//MIDDLEWARE
//===========================
app.use( cors() )
app.use( bodyParser.json() )
app.use( morgan( 'dev' ) )

//SOCKET
//===========================
var server = require( 'http' ).Server( app )
var io = require( 'socket.io' )( server )
require( './socket.js' ).connect( io )

//MODELS
//===========================
var User = require( './models/userModel.js' )
var Order = require( './models/orderModel.js')



var Item = require( './models/itemModel.js' )


//ROUTES
//===========================
var apiRoutes = require( './routes/routes.js' )

app.use( '', apiRoutes )
app.use( '*', function( req, res ) {
	res.json( 'No Endpoint found' )
} )

//SERVER
// var nsp = io.of( '/' )
var mainSocket
io.on( 'connection', function( socket ) {
	mainSocket = socket
	socket.on( 'orders', function( data ) {
		console.log(data.order);
		console.log(data.message);
		io.emit('orderForVendor', data);
		// io.emit('orderForVendor', "YOOOOO");
	} )

	// socket.on( 'new order', function( data ) {
	// 	console.log( 'NNNNNNNNNNNNNNNNN', data )
	// } )

} )
//===========================
server.listen( PORT, function() {
	console.log( 'Running on port: ', PORT )
} )
