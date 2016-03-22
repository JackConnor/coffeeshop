//DECLARING VARIABLES
//===========================
var express           = require( 'express' )
var Router            = express.Router()

var userRoutes = require( './userRoutes.js' )
var orderRoutes = require( './orderRoutes.js')
var authCtrl   = require( '../controllers/authController.js' )
var itemRoutes = require( './itemRoutes.js' )

Router.use( '/users', userRoutes.noAuth )
Router.use( '/items', itemRoutes )
Router.use( '/orders', orderRoutes )
Router.route( '/authenticate' ).post( authCtrl.authenticate )

Router.use( authCtrl.isAuthentic )

Router.use( '/users', userRoutes.auth )


module.exports = Router
