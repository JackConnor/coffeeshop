//DECLARING VARIABLES
//===========================
var mongoose       = require( 'mongoose' )
var Order          = mongoose.model( 'Order' )
var Menuitem       = mongoose.model('Menuitem');
var Item           = mongoose.model('Item');

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
  var order = req.body.order;
  var items = order.items;
  var newOrder = new Order();
  newOrder.name = order.name;
  var counter = [];
  ///////now we create a menuitem for each thing ordered
  for (var i = 0; i < items.length; i++) {
    Menuitem.create({itemId: items[i].itemId, price: items[i].price, name: order.name, status: 'active', createdDate: new Date(), customizations: items[i].customizations, order: newOrder._id}, function(err, newMenuItem){
      if(err){console.log(err)}
      newOrder.menuitems[counter.length] = newMenuItem;
      counter.push('x');
      if(counter.length == items.length){
        newOrder.save(function(err, newerOrder){
          if(err){console.log(err)}
          res.json( {
                error: null,
                status: 200,
                message: 'Order has been placed!',
                data: newerOrder
          } );
        });
      }
    })
  }
}

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
  console.log('yooooooosippp');
  Order.find({})
  // .populate('Menuitems')
  .exec(function(err, data){
    if(err){console.log(err)}
    console.log('oh data');
    console.log(data);
    res.json(data);
  });
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

function showOne(req, res){
  var orderId = req.params.orderId;
  console.log(orderId);
  Order.findOne({_id: orderId})
  .populate('menuitems')
  .exec(function(err, lastOrder){
    if(err){throw err}
    res.json( {
      error: null,
      status: 200,
      message: 'Here is the order you updated!',
      data: lastOrder
      } )
  })
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
  console.log('updating status babbbbbby');
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
  showOne: showOne,
  update: update,
  destroy: destroy
}
