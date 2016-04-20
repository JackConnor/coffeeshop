var authCtrl = require( '../controllers/authController.js' )
var Router = require( 'express' ).Router()

Router.route( '/authenticate' )
	.post( authCtrl.authenticate )

module.exports = Router
