//DECLARING VARIABLES
//===========================
var auth   = require( 'express' ).Router()
var orderCtrl = require( '../controllers/orderController.js' )

auth.route('')
    .get( orderCtrl.index )
    .post( orderCtrl.create )

auth.route('/one')
    .post( orderCtrl.show )
    .put( orderCtrl.update )
    .delete( orderCtrl.destroy )

module.exports = auth
// {
//   auth : auth
// }
