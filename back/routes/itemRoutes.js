//DECLARING VARIABLES
//===========================
var noAuth   = require( 'express' ).Router()
var Auth     = require( 'express' ).Router()
var userCtrl = require( '../controllers/itemController.js' )

Auth.route( '' )
		.get( userCtrl.index )
		.post( userCtrl.create )

Auth.route( '/one' )
	.get( userCtrl.show )
	.put( userCtrl.update )
	.delete( userCtrl.destroy )



module.exports = Auth
// {
// 	noAuth : noAuth,
// 	auth   : Auth
// }
