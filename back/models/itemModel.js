//DECLARING VARIABLES
//===========================
var mongoose           = require( 'mongoose' )
var Item

Item = new mongoose.Schema( {
	name : { type: String, unique: false },
	type : { type: String },
	price: { type: Number },
	description: { type: String }
} )

module.exports = mongoose.model( 'Item', Item )