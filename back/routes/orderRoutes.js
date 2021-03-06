//DECLARING VARIABLES
//===========================
var auth   = require( 'express' ).Router()
var orderCtrl = require( '../controllers/orderController.js' )

auth.route('')
    .get( orderCtrl.index )
    .post( orderCtrl.create )
  	.put( orderCtrl.allUser )
    .patch( orderCtrl.single)

auth.route('/one')
    .post( orderCtrl.show )
    .put( orderCtrl.update )
  	.patch( orderCtrl.completed )
    .delete( orderCtrl.destroy )

auth.route('/one/:orderId')
    .get( orderCtrl.showOne)

module.exports = auth
// {
//   auth : auth
// }
