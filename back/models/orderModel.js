//DECLARING VARIABLES
//===========================
var mongoose  = require('mongoose')
var Order

//SCHEMA
//===========================
Order = new mongoose.Schema({
  uId         : String, //require true later required: true, ref: 'User'
  items       : [],
  total       : Number,
  cleared     : Date
}, {timestamps: true}) //testing timestamps

//METHODS
//===========================

// Middleware for checking updated timestamp?

// Order.genTimeStamp = function(next) {}?


//EXPORTS
//===========================
module.exports = mongoose.model( 'Order', Order )
