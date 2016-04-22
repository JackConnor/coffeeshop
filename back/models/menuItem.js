//DECLARING VARIABLES
//===========================
var mongoose           = require( 'mongoose' )
var Menuitem;

Menuitem = new mongoose.Schema( {
	name : { type: String, unique: false },
	itemId : { type: String, ref: "Item" },
	price: { type: Number },
	status: {type: String, default: 'active'},
  createdDate: Date,
	orderId: {type: String, ref: "Order"},
	completedAt : Date,
	description: { type: String },
  customizations: Array
} )

module.exports = mongoose.model( 'Menuitem', Menuitem )
