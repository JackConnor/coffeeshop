//DECLARING VARIABLES
//===========================
var mongoose       = require( 'mongoose' )
var Item           = mongoose.model( 'Item' )

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
	var item = req.body.item
	var promise = Item.create( item )
			promise.then( function( data ) {
				res.json( {
					error: null,
					status: 200,
					message: 'Here is the item you created!',
					data: data
				} )
			} )
			.catch( function( err ) {
				sendErr( err, res )
			} )
}

function index( req, res ) {
	var promise = Item.find().exec()
	promise.then( function( data ) {
		res.json( {
			error: null,
			status: 200,
			message: 'Here are all the items you wanted',
			data: data
		} )
	} )
	.catch( function( err ) {
		sendErr( err, res )
	} )
}

function show( req, res ) {
	var itemId = req.body.item.id || req.headers[ 'item' ].id
	var promise = Item.findById( itemId ).exec()
	promise.then( function( data ) {
		res.json( {
					error: null,
					status: 200,
					message: 'Here is the item you wanted!',
					data: data
				} )
	} )
	.catch( function( err ) {
		sendErr( err, res )
	} )
}

function update( req, res ) {
	var itemId = req.body.itemId;
	var newStatus = req.body.status;
	Item.findOne( {_id: itemId}, function(err, item){
		if(err){console.log(err)}
		item.status = newStatus;
		item.save(function(err, newItem){
			if(err){console.log(err)}
			res.json( {
						error: null,
						status: 200,
						message: 'Here is the item you updated!',
						data: newItem
			} )
		})
	})
}

function destroy( req, res ) {
	var id = req.body.item.id
	var promise = Item.findByIdAndRemove( id ).exec()
	promise.then( function( data ) {
		res.json( {
					error: null,
					status: 200,
					message: 'Successfully Deleted Item!',
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
	destroy: destroy
}
