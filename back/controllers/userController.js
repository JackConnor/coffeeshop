//DECLARING VARIABLES
//===========================
var mongoose       = require( 'mongoose' )
var User           = mongoose.model( 'User' )
var auth           = require( './authController.js' ).signJwt

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
	console.log('WE got it!', req.body )
	var user = req.body.user
	console.log(user);
	var promise = User.create( user )
			promise.then( function( data ) {
				var token = auth( user )
				res.json( {
					error: null,
					status: 200,
					message: 'Here is the user you created!',
					token : token,
					data: data
				} )
			} )
			.catch( function( err ) {
				sendErr( err, res )
			} )
}

function index( req, res ) {
	var promise = User.find().exec()
	promise.then( function( data ) {
		res.json( {
			error: null,
			status: 200,
			message: 'Here are all the users you wanted',
			data: data
		} )
	} )
	.catch( function( err ) {
		sendErr( err, res )
	} )
}

function show( req, res ) {
	var userId = req.decoded.id
	var promise = User.findById( userId ).exec()
	promise.then( function( data ) {
		res.json( {
					error: null,
					status: 200,
					message: 'Here is the user you wanted!',
					data: data
				} )
	} )
	.catch( function( err ) {
		sendErr( err, res )
	} )
}

function update( req, res ) {
	var user = req.body.user
	var id   = req.decoded.id
	var promise = User.findByIdAndUpdate( id, user, { new: true } ).exec()
	promise.then( function( data ) {
		res.json( {
					error: null,
					status: 200,
					message: 'Here is the user you updated!',
					data: data
				} )
	} )
	.catch( function( err ) {
		sendErr( err, res )
	} )
}

function reward( req, res ) {
  var id = req.decoded.id
  var promise = User.findOne( { _id: id } ).exec()
  promise.then( function( user ) {
    user.rewards--
    res.json( {
          error: null,
          status: 200,
          message: 'User has used a reward!',
          data: data
        } )
  } )
  .catch( function( err ) {
    sendErr( err, res )
  } )
}

function destroy( req, res ) {
  var id = req.decoded.id
  var promise = User.findByIdAndRemove( id ).exec()
  promise.then( function( data ) {
    res.json( {
          error: null,
          status: 200,
          message: 'Successfully Deleted User!',
          data: data
        } )
  } )
  .catch( function( err ) {
    sendErr( err, res )
  } )
}

//EXPORTS
//===========================
module.exports = {
	create : create,
	index  : index,
	show   : show,
	update : update,
  reward : reward,
	destroy: destroy
}
