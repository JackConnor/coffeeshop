//DECLARING VARIABLES
//===========================
var bcrypt           = require( 'bcrypt-nodejs' )
var mongoose         = require( 'mongoose' )
var User

//SCHEMA
//===========================
User = new mongoose.Schema( {
	email         : { type: String, required: true, unique: true },
	name          : { type: String },
	password      : { type: String, required: true, unique: false },
  vendor        : { type: Boolean, default: false },
  currentOrders : [],
  orderHistory  : [], //Reference to orderModel
  currentOrder  : { type: String, ref: 'Order'},
	rewards       : Number
} )

//METHODS
//===========================
User.pre( 'save', function( next ) {
	var user = this
	if ( user.isModified( 'password' ) ) {
		user.genHash( user.password, next )
    next()
	} else {
		next()
	}
} )

User.methods.genHash = function( password, next ) {
	var user = this
	user.password = bcrypt.hash( password, null, null, function( err, hash ) {
		if ( err ) {
			console.log( "Error", err )
			throw err
		} else {
			user.password = hash
			console.log( 'NEXT', user )
			next()
		}
	} )
}

User.methods.validPassword = function( password ) {
	return bcrypt.compareSync( password, this.password )
}

//EXPORTS
//===========================
module.exports = mongoose.model( 'User', User )
