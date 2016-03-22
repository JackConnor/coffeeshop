var Auth   = require( 'express' ).Router()
var paymentCtrl = require( '../controllers/paymentController.js' )

Auth.route( '/token' )
    .post( paymentCtrl.getToken )

Auth.route( '/process' )
  .post( paymentCtrl.processSale )
  

module.exports= Auth