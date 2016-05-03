//DECLARING VARIABLES
//===========================
var express           = require( 'express' )
var Router            = express.Router()

var userRoutes = require( './userRoutes.js' )
var orderRoutes = require( './orderRoutes.js')
var menuitemRoutes = require( './menuitemRoutes.js' )
var authCtrl   = require( '../controllers/authController.js' )
var itemRoutes = require( './itemRoutes.js' )
var paymentRoutes = require( './paymentRoutes.js' )


Router.use( '/payments', paymentRoutes)
Router.use( '/users', userRoutes.noAuth )
Router.use( '/items', itemRoutes.noAuth )
Router.use( '/menuitems', menuitemRoutes)
Router.use( '/orders', orderRoutes )
Router.use( '/items', itemRoutes.auth )

Router.route( '/authenticate' ).post( authCtrl.authenticate );

Router.use( authCtrl.isAuthentic )

Router.use( '/users', userRoutes.auth )


module.exports = Router
