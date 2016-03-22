//DECLARING VARIABLES
//===========================
var mongoose       = require( 'mongoose' )
var Order          = mongoose.model( 'Order' )

//FUNCTIONS
//===========================
function sendErr( err, res ) {
        res.json( {
          error: err,
          status: 500,
          message: "Error Occured",
          data: null
        } )
}

//CRUD
//===========================
function create( req, res ) {
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
        sendErr(err, res)
      } )
}

function index( req, res ) {
  var promise = Order.find().exec()
  promise.then( function( data ) {
    res.json( {
      error: null,
      status: 200,
      message: 'Here are all the orders',
      data: data
    } )
  } )
  .catch( function( err ) {
    sendErr( err, res )
  } )
}

function show( req, res ) {
  var orderId = req.body.order.id || req.headers.order
  var promise = Order.findById( orderId ).exec()
  promise.then( function( data ) {
    res.json( {
          error: null,
          status: 200,
          message: 'Here is the order you wanted!',
          data: data
        } )
  } )
  .catch( function( err ) {
    sendErr( err, res )
  } )
}

function update( req, res ) {
  var order = req.body.order
  var orderId   = req.body.order.id
  var promise = Order.findByIdAndUpdate( orderId, order, {new: true} ).exec()
  promise.then( function( data ) {
    res.json( {
          error: null,
          status: 200,
          message: 'Here is the order you updated!',
          data: data
        } )
  } )
  .catch( function( err ) {
    sendErr( err, res )
  } )
}

function destroy( req, res ) {
  var orderId = req.body.order.id
  var promise = Order.findByIdAndRemove( orderId ).exec()
  promise.then( function( data ) {
    res.json( {
          error: null,
          status: 200,
          message: 'Successfully Deleted Order!',
          data: data
        } )
  } )
  .catch( function( err ) {
    sendErr( err, res )
  } )
}


module.exports = {
  create: create,
  index: index,
  show: show,
  update: update,
  destroy: destroy
}
