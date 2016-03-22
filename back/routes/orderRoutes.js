//DECLARING VARIABLES
//===========================
var auth   = require( 'express' ).Router()
var orderCtrl = require( '../controllers/orderController.js' )

auth.route('').post( orderCtrl.create )

module.exports = {
  auth : auth
}
