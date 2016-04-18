//DECLARING VARIABLES
//===========================
var mongoose       = require( 'mongoose' )
var Order          = mongoose.model( 'Order' )


var app   = require( 'express' )()
var server = require( 'http' ).Server( app )
var io = require( 'socket.io' )( server )
// var nsp = io.of( '/' )
var mainSocket
io.on( 'connection', function( socket ) {
	mainSocket = socket
	socket.on( 'test', function( data ) {
		console.log( 'Test!' )
	} )

	socket.on( 'new order', function( data ) {
		console.log( 'NNNNNNNNNNNNNNNNN', data )
	} )

} )

// io.on( 'new order', function( data ) {
// 		console.log( 'NNNNNNNNNNNNNNNNN', data )
// 	} )

// var socket             = require( '../socket.js' ).socket
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
  order.uId = req.decoded.id
  var promise = Order.create( order )
      promise.then( function( data ) {
        // SOCKET!!!
		// io.emit( 'new order', data )
		// console.log( mainSocket )
		// mainSocket.emit( 'new order', data )
      mongoose.model( 'User' ).findOne( { _id: req.decoded.id }).exec(function(err, user){
        user.currentOrder = data._id
        user.orderHistory.push( user.currentOrder )
        console.log(user)
        if(user.orderHistory.length % 10 != 0) {
          user.rewards++
        }
        user.save(function(err, status) {
          console.log('PPPPPPPPPPPPPPPPPPP', err, status)
        })
        res.json( {
              error: null,
              status: 200,
              message: 'Order has been placed!',
              data: data
            } )
          } )
      } )
      .catch( function( err ) {
        sendErr(err, res)
      } )
}

function index( req, res ) {
  var promise = Order.find( { completed: false } ).exec()
  promise.then( function( data ) {
		console.log(data);
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

function allUser( req, res ) {
	var user = req.decoded
	var promise = Order.find( { uId: user.id } ).exec()
		promise.then( function( data ) {
			res.json( {
				error: null,
				status: 200,
				message: 'Here are your orders!',
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

function completed( req, res ) {
	var orderId = req.body.order.id
	var promise = Order.findByIdAndUpdate( orderId, { completed: true }, { new: true } ).exec()
	promise.then( function( data ) {
		// SOCKET!!
		io.emit( 'completed order', data )
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

function update( req, res ) {
  var order = req.body.order
  var orderId   = req.body.order.id
  var promise = Order.findByIdAndUpdate( orderId, order, {new: true} ).exec()
  promise.then( function( data ) {
    // SOCKET!!
	io.emit( 'updated order', data )
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
  allUser: allUser,
  completed : completed,
  show: show,
  update: update,
  destroy: destroy
}
