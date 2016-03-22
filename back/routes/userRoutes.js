//DECLARING VARIABLES
//===========================
var noAuth   = require( 'express' ).Router()
var Auth   = require( 'express' ).Router()
var userCtrl = require( '../controllers/userController.js' )

noAuth.route( '/users' )
		.post( userCtrl.create )


module.exports = {
	noAuth : noAuth
}
