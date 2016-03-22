//DECLARING VARIABLES
//===========================
var Auth   = require( 'express' ).Router()
var orderCtrl = require( '../controllers/orderController.js' )

Auth.route( '/orders' )
    .post( orderCtrl.create )


module.exports = {
  Auth : Auth
}
