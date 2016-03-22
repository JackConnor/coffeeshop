//DECLARING VARIABLES
//===========================
var mongoose       = require( 'mongoose' )
var User           = mongoose.model( 'User' )

function create( req, res ) {
	console.log('WE got it!', req.body )
	var user = req.body.user
	var promise = User.create( user )
			promise.then( function( data ) {
				res.json( {
					error: null,
					status: 200,
					message: 'Here is the user you created!',
					data: data
				} )
			} )
			.catch( function( err ) {
				res.json( {
					error: err,
					status: 500,
					message: "Error Occured",
					data: null
				} )
			} )
}
module.exports = {
	create: create
}