//DECLARING VARIABLES
//===========================
var noAuth   = require( 'express' ).Router()
var Auth     = require( 'express' ).Router()
var itemCtrl = require( '../controllers/itemController.js' )

noAuth.route( '' )
		.get( itemCtrl.index )
		.post( itemCtrl.show )
		.put( itemCtrl.update )

Auth.route( '/one' )
	.post( itemCtrl.create )
	.delete( itemCtrl.destroy )


module.exports =
{
	noAuth : noAuth,
	auth   : Auth
}
