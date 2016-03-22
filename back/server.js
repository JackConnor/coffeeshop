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


//SERVER
//===========================
app.listen( PORT, function() {
	console.log( 'Running on port: ', PORT )
} )