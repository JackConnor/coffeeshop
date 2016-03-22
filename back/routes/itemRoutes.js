//DECLARING VARIABLES
//===========================
var noAuth   = require( 'express' ).Router()
var Auth     = require( 'express' ).Router()
var itemCtrl = require( '../controllers/itemController.js' )

noAuth.route( '' )
		.get( itemCtrl.index )
		.post( itemCtrl.show )

Auth.route( '/one' )
	.post( itemCtrl.create )
	.put( itemCtrl.update )
	.delete( itemCtrl.destroy )


module.exports =
{
	noAuth : noAuth,
	auth   : Auth
}
