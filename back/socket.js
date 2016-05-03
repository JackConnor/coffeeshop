var mainSocket

function connect( io ) {
	var nsp = io.of( '/api' )
	nsp.on( 'connection', function( socket ) {

		socket.on( 'order creation', function( data ) {
		} )

		mainSocket = socket
	} )
}

module.exports = {
	connect: connect,
	socket : mainSocket
}