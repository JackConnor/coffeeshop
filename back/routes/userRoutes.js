//DECLARING VARIABLES
//===========================
var noAuth   = require( 'express' ).Router()
var Auth   = require( 'express' ).Router()
var userCtrl = require( '../controllers/userController.js' )

noAuth.route( '' )
		.get( userCtrl.index )
		.post( userCtrl.create )

Auth.route( '/one' )
	.get( userCtrl.show )
	.put( userCtrl.update )
  .patch( userCtrl.reward )
	.delete( userCtrl.destroy )

module.exports = {
	noAuth : noAuth,
	auth   : Auth
}
