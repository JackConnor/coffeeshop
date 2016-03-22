//DECLARING VARIABLES
//===========================
var express           = require( 'express' )
var Router            = express.Router()

var userRoutes = require( './userRoutes.js' )
var authCtrl   = require( '../controllers/authController.js' )

Router.use( '/users', userRoutes.noAuth )

Router.route( '/authenticate' ).post( authCtrl.authenticate )

// Router.use( '/users', userRoutes.auth )

module.exports = Router