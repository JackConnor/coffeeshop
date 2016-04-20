//DECLARING VARIABLES
//===========================
var mongoose       = require( 'mongoose' )
var Order          = mongoose.model( 'Order' )


var app   = require( 'express' )()

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
	console.log('yoooooooooo');
  var order = req.body.order;
	console.log(order);

	Order.create({items: order.items, name: order.name}, function(err, newOrder){
    console.log();
		if(err)console.log(err);
		if(req.body.hasOwnProperty('decoded')){
			order.uId = req.decoded.id;
			mongoose.model( 'User' ).findOne( { _id: req.body.decoded.id }).exec(function(err, user){
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
							data: newOrder
						} )
					} )
		}
		else {
			console.log('no idea');
			res.json( {
						error: null,
						status: 200,
						message: 'Order has been placed!',
						data: newOrder
					} )
		}
	})
}

// function single(req, res){
//
// }

function single( req, res ) {
	console.log(req.body);
  Order.findOne({'_id': req.body.orderId})
	.populate('items')
	.exec(function( err, data ) {
		if(err) console.log(err);
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

function index( req, res ) {
  var promise = Order.find( { completed: false } )
  .populate('items')
  .exec();
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
	single: single,
  index: index,
  allUser: allUser,
  completed : completed,
  show: show,
  update: update,
  destroy: destroy
}
