//DECLARING VARIABLES
//===========================
var mongoose       = require( 'mongoose' )
var Order          = mongoose.model( 'Order' )

function create( req, res ) {
  console.log('getting to create order')
  var order = req.body.order
  var promise = Order.create( order )
      promise.then( function( data ) {
        res.json( {
          error: null,
          status: 200,
          message: 'Order has been placed!',
          data: data
        } )
      } )
      .catch( function( err ) {
        res.json( {
          error: err,
          status: 500,
          message: "Error Occured",
          data: null
        } )
      } )
}

module.exports = {
  create: create
}
