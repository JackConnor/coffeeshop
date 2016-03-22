//DECLARING VARIABLES
//===========================
var noAuth   = require( 'express' ).Router()
var Auth     = require( 'express' ).Router()
var itemCtrl = require( '../controllers/itemController.js' )

Auth.route( '' )
		.get( itemCtrl.index )
		.post( itemCtrl.create )

Auth.route( '/one' )
	.post( itemCtrl.show )
	.put( itemCtrl.update )
	.delete( itemCtrl.destroy )



module.exports = Auth
// {
// 	noAuth : noAuth,
// 	auth   : Auth
// }
