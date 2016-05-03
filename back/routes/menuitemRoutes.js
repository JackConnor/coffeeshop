var auth   = require( 'express' ).Router()
var menuitemCtrl = require( '../controllers/menuitemController.js' )
console.log(menuitemCtrl.index);

auth.route('')
    .get( menuitemCtrl.index )

auth.route('/updatestatus')
    .post( menuitemCtrl.updateStatus )

auth.route('/full/:menuid')
    .get( menuitemCtrl.single )

module.exports = auth
