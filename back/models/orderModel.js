//DECLARING VARIABLES
//===========================
var mongoose  = require('mongoose')
var Order

//SCHEMA
//===========================
Order = new mongoose.Schema({
  uId         : { type: String, ref: 'User' }, //require true later required: true, ref: 'User'
  name       : String,////if no user id
  menuitems       : [{ type: String, ref: 'Menuitem'}],
  total       : Number,
  completed   : { type: Boolean, default: false },
  completedAt : Date,
}, {timestamps: true}) //testing timestamps

//METHODS
//===========================
Order.pre( 'save', function( next ) {
  var order = this
  if ( order.isModified( 'items' ) ) {
    order.items = order.items.map(function(item){
      return item._id ? item._id : item
    })
    next()
  } else {
    next()
  }
} )


//EXPORTS
//===========================
module.exports = mongoose.model( 'Order', Order )
