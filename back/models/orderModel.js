//DECLARING VARIABLES
//===========================
var mongoose  = require('mongoose')
var Order

//SCHEMA
//===========================
Order = new mongoose.Schema({
  uId         : {type: String, ref: 'User'},
  items       : [],
  total       : Number,
  created     : Date,
  cleared     : Date
})

//METHODS
//===========================

// created timestamp?


//EXPORTS
//===========================
module.exports = mongoose.model( 'Order', Order )
