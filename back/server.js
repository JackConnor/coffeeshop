//DECLARING VARIABLES
//===========================
var express        = require( 'express' )
var morgan           = require( 'morgan' )
var mongoose           = require( 'mongoose' )
var cors           = require( 'cors' )
var bodyParser           = require( 'body-parser' )

var app = express()

var Dev = require( './.Dev.js' )
var PORT = Dev.PORT
var DB   = Dev.DB

//DB
//===========================
mongoose.connect( DB )

//MODELS
//===========================
var User = require( './models/userModel.js' )

//MIDDLEWARE
//===========================
app.use( cors() )
app.use( bodyParser.json() )
app.use( morgan( 'dev' ) )

//ROUTES
//===========================
var apiRoutes = require( './routes/routes.js' )

app.use( '', apiRoutes )

//SERVER
//===========================
app.listen( PORT, function() {
	console.log( 'Running on port: ', PORT )
} )