//DECLARING VARIABLES
//===========================
var mongoose       = require( 'mongoose' )
var jwt            = require( 'jsonwebtoken' )
var User           = mongoose.model( 'User' )
var secret         = 'coffee'

function signJwt( user ) {
	console.log( 'JWT' )
	return jwt.sign( {
		name : user.name,
		email: user.email,
		id   : user._id
	}, secret, {
		expiresIn: 3600
	} )
}

// TODO write checks for unfound user
function authenticate( req, res ) {
	var email    = req.body.user.email
	var password = req.body.user.password
	var promise  = User.findOne( { email: email } ).exec()
		promise
		.then( function( user ) {
			if ( !user ) {
				throw 'No user found'
			}
			if ( user.validPassword( password ) ) {
				var token = signJwt( user )
        var msg = {
          error: null,
          status: 200,
          message: 'Here is your token',
          vendor: user.vendor,
          data: token
        }
			} else {
				var msg = {
					error: 'Wrong Login Info',
					status: 401,
					message: 'Incorrect login info',
					data: null
				}
			}
      res.json(msg)
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

function badToken( res, err ) {
	res.json( {
		error: err || "No Token Provided",
		status: 401,
		message: 'No Token Provided',
		data: null
	} )
}

// TODO MAKE verify a promise
function isAuthentic( req, res, next ) {
	var token = req.body.token || req.headers[ 'x-access-token' ] || req.query.token
	if ( token ) {
		jwt.verify( token, secret, function( err, decoded ) {
			if ( err ) {
				badToken( res, err )
			} else {
				req.decoded = decoded
				next()
			}
		} )
	} else {
		badToken( res )
	}
}

module.exports = {
	signJwt      : signJwt,
	authenticate : authenticate,
	isAuthentic  : isAuthentic
}
