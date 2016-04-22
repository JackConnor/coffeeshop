//DECLARING VARIABLES
//===========================
var mongoose           = require( 'mongoose' )
var Item

Item = new mongoose.Schema( {
	name : { type: String, unique: false },
	type : { type: String },
  quantity: { type: Number, default: 0 },
	price: { type: Number },
	// status: {type: String, default: 'active'},
	// completedAt : Date,
	description: { type: String }
} )

module.exports = mongoose.model( 'Item', Item )
