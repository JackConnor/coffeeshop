var auth   = require( 'express' ).Router()
var menuitemCtrl = require( '../controllers/menuitemController.js' )
console.log(menuitemCtrl.index);

auth.route('')
    .get( menuitemCtrl.index )

auth.route('/updatestatus')
    .post( menuitemCtrl.updateStatus )

module.exports = auth
