var mongoose       = require( 'mongoose' )
var Menuitem       = mongoose.model('Menuitem');


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

function index(req, res){
  Menuitem.find({})
  .populate('itemId')
  .exec(function(err, allMenuItems){
    if(err) {throw err}
    res.json({
      error: null,
      status: 200,
      message: 'Menu items Retrieved',
      data: allMenuItems
    })
  })
}

function updateStatus(req, res){
  console.log(req.body);
  console.log('are we even here?');
  var itemId = req.body.itemId;
  var newStatus = req.body.status;
  Menuitem.findOne( {_id: itemId}, function(err, item){
    if(err){console.log(err)}
    if(err){console.log(err)}
    item.status = newStatus;
    item.save(function(err, newItem){
      if(err){console.log(err)}
      console.log('updated menutitem coming up');
      // console.log(newItem);
      res.json( {
            error: null,
            status: 200,
            message: 'Here is the item you updated!',
            data: newItem
      } )
    })
  })
}

function single(req, res){
  console.log('in menu order thing');
  var orderId = req.params.menuid;
  console.log(orderId);
  Menuitem.findOne({_id: orderId})
  .populate('itemId')
  .exec(function(err, lastOrder){
    console.log('last order with itemId');
    console.log(lastOrder);
    if(err){throw err}
    res.json( {
      error: null,
      status: 200,
      message: 'Here is the order you updated!',
      data: lastOrder
      } )
  })
}

module.exports = {

  index: index,
  updateStatus: updateStatus,
  single: single
}
